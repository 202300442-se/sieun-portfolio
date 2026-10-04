"""Read existing public Google Sheet tabs; write only explicitly public records."""
import csv
import hashlib
import io
import json
import os
from datetime import date, datetime, timezone
from pathlib import Path
from urllib.parse import urlencode, urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
SHEET_ID = '1G1Yjta3yo0O_Rie50I2pyJ5c6XcQA-wsf8UA2Kw5TlQ'
TABS = {'Brush Industry': 101, 'Economy Study': 102}
FIELDS = {'날짜':'date','출처':'source','분야':'field','제목':'title','핵심요약':'summary','경제·산업 개념':'concepts','내가 배운 점':'reflection','추가 공부할 개념':'nextStudy','회사/진로 연결':'connection','원문 링크':'url','검증':'verification'}

def parse_rows(text, category):
    reader = csv.DictReader(io.StringIO(text.lstrip('\ufeff')))
    required = {'날짜', '제목', '핵심요약', '공개'}
    if not reader.fieldnames or not required.issubset(reader.fieldnames):
        raise ValueError(f'{category}: required headers missing; existing snapshot preserved')
    entries = []
    for row in reader:
        if (row.get('공개') or '').strip().upper() != 'Y':
            continue
        item = {value: (row.get(key) or '').strip() for key, value in FIELDS.items()}
        if not item['title'] or not item['summary']:
            continue
        try:
            item['date'] = date.fromisoformat(item['date']).isoformat()
        except ValueError as exc:
            raise ValueError(f'{category}: public record requires YYYY-MM-DD date') from exc
        if item['url'] and urlparse(item['url']).scheme not in ('https', 'http'):
            item['url'] = ''
        item['category'] = category
        item['id'] = hashlib.sha256((category + item['date'] + item['title']).encode()).hexdigest()[:16]
        entries.append(item)
    return entries

def sync():
    entries = []
    for category, gid in TABS.items():
        query = urlencode({'format':'csv','gid':gid})
        url = f'https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?{query}'
        with urlopen(Request(url, headers={'User-Agent':'sieun-portfolio-learning-log/1.0'}), timeout=45) as response:
            if 'accounts.google.com' in response.url:
                raise ValueError('Sheet requires authentication; no data replaced')
            text = response.read(2_000_001)
            if len(text) > 2_000_000:
                raise ValueError('Sheet export exceeds expected limit')
            text = text.decode('utf-8-sig')
            if text.lstrip().lower().startswith(('<!doctype','<html')):
                raise ValueError('Sheet returned HTML; no data replaced')
        entries.extend(parse_rows(text, category))
    entries.sort(key=lambda e:(e['date'],e['id']), reverse=True)
    target = ROOT / 'data' / 'learning-log.json'
    old = json.loads(target.read_text(encoding='utf-8')) if target.exists() else {}
    if old.get('entries') == entries:
        print(f'No changes: {len(entries)} public records')
        return
    payload = {'version':1,'updatedAt':datetime.now(timezone.utc).isoformat(),'entries':entries}
    target.parent.mkdir(exist_ok=True)
    temporary = target.with_suffix('.tmp')
    temporary.write_text(json.dumps(payload, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    temporary.replace(target)
    print(f'Updated {len(entries)} public records')

if __name__ == '__main__':
    sync()
