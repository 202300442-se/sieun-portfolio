"""Deployment checks for local paths, anchors and data safety."""
import json
import sys
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
from sync_learning_log import parse_rows

ROOT = Path(__file__).resolve().parents[1]
class Document(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids = set(); self.links = []; self.h1 = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a: self.ids.add(a['id'])
        if tag == 'h1': self.h1 += 1
        if tag == 'img': assert 'alt' in a, 'Image missing alt'
        if tag == 'a' and a.get('target') == '_blank': assert 'noopener' in a.get('rel',''), 'External link missing noopener'
        for key in ('href','src'):
            if key in a: self.links.append(a[key])

class PublicRecordTests(unittest.TestCase):
    def test_private_and_incomplete_records_never_export(self):
        text = '날짜,제목,핵심요약,공개\n2026-09-24,Public,Summary,Y\n2026-09-24,SECRET,Private,N\n2026-09-24,Incomplete,,Y\n'
        self.assertEqual([e['title'] for e in parse_rows(text,'Brush Industry')], ['Public'])
    def test_missing_visibility_header_fails_closed(self):
        with self.assertRaises(ValueError): parse_rows('날짜,제목,핵심요약\n2026-09-24,Title,Summary','Brush Industry')
    def test_unsafe_source_link_is_discarded(self):
        item = parse_rows('날짜,제목,핵심요약,공개,原文,원문 링크\n2026-09-24,Title,Summary,Y,,javascript:alert(1)','Brush Industry')[0]
        self.assertEqual(item['url'], '')
    def test_invalid_public_date_fails(self):
        with self.assertRaises(ValueError): parse_rows('날짜,제목,핵심요약,공개\ninvalid,Title,Summary,Y','Brush Industry')

def check():
    doc = Document(); doc.feed((ROOT/'index.html').read_text(encoding='utf-8'))
    assert doc.h1 == 1
    for link in doc.links:
        parsed = urlparse(link)
        if parsed.scheme: continue
        if parsed.path: assert (ROOT/parsed.path).is_file(), f'Missing file: {link}'
        elif parsed.fragment: assert parsed.fragment in doc.ids, f'Missing anchor: {link}'
    assert 'learning' in doc.ids
    data = json.loads((ROOT/'data/learning-log.json').read_text(encoding='utf-8'))
    for item in data['entries']:
        assert item['category'] in ('Brush Industry','Economy Study')
        assert item['title'] and item['summary']
    suite = unittest.defaultTestLoader.loadTestsFromTestCase(PublicRecordTests)
    assert unittest.TextTestRunner().run(suite).wasSuccessful()
    print(f'Validated site, anchors, assets and {len(data["entries"])} public records')

if __name__ == '__main__': check()
