const g="data:text/markdown;base64,IyBDaGFwdGVyIDEgOiBDb21iaW5hdG9yaWFsIEFuYWx5c2lzCgpNYXRoZW1hdGljYWwgdGhlb3J5IG9mIGNvdW50aW5nIGlzIGZvcm1hbGx5IGtub3cgYXMgX2NvbWJpbmF0b3JpYWwgYW5hbHlzaXNfLgoKIyMgVGhlIEJhc2ljIFByaW5jaXBsZSBvZiBDb3VudGluZwoKPiBJZiBvbmUgZXhwZXJpbWVudCBoYXMgYG1gIG91dGNvbWVzIGFuZCBhbm90aGVyIGV4cGVyaW1lbnQgaGFzIGBuYCBvdXRjb21lcywgdGhlbiB0aGUgdG90YWwgcG9zc2libGUgb3V0Y29tZXMgb2YgdGhlIHR3byBleHBlcmltZW50cyBhcmUgYG1uYAoKKipRLioqIEluIGEgNy1wbGFjZSBsaWNlbnNlIHBsYXRlICwgZmlyc3QgdGhyZWUgcGxhY2VzIGNhbiBiZSBub24gcmVwZWF0ZWQgbGV0dGVycyBhbmQgb3RoZXIgZm91ciBwbGFjZXMgY2FuIGJlIG5vbiByZXBlYXRlZCBudW1iZXJzLiBXaGF0IGFyZSB0aGUgdG90YWwgcG9zc2libGUgY29tYmluYXRpb25zIG9mIGxpY2Vuc2UgcGxhdGVzLgoKKipBLioqIGAyNiB4IDI1IHggMjQgeCAxMCB4IDkgeCA4IHggN2AgPSBgNzg2MjQwMDBgIHBvc3NpYmxlIGxpY2Vuc2UgcGxhdGVzCgotLS0KCiMjIFBlcm11dGF0aW9ucwoKPiBOdW1iZXIgb2YgcG9zc2libGUgYXJyYW5nZW1lbnRzIGZvciBhIHNwZWNpZmljIHNldCBvZiBlbGVtZW50cwoKLSBgbiFgID0gYG4geCAobi0xKSB4IChuLTIpIHggLi4uLiAobi1uKWAKICAkJAogIF5uUF9yID0gXGZyYWN7biF9eyhuLXIpIX0KICAkJAogIG4gPSBgdG90YWwgbnVtYmVyIG9mIG9iamVjdHNgCiAgciA9IGBudW1iZXIgb2Ygb2JqZWN0cyBzZWxlY3RlZGAKCioqUS4qKiBUb3RhbCBudW1iZXIgb2YgbGV0dGVyIGFycmFuZ2VtZW50cyBmcm9tIGBQRVBQRVJgPwoKKipBLioqIG4gPSA2LiBIZXJlLCBgUGAgcmVwZWF0cyAzIHRpbWVzIGFuZCBgRWAgcmVwZWF0cyAyIHRpbWVzLiBTbywgdG90YWwgbnVtYmVyIG9mIHBlcm11dGF0aW9ucyBjYW4gYmUgZ2l2ZW4gYnkKCiQkClxmcmFjezYhfXsoMyEpKDIhKX0gPSA2MAokJAoKLS0tCgojIyBDb21iaW5hdGlvbnMKCj4gQSBtYXRoZW1hdGljYWwgdGVjaG5pcXVlIHRoYXQgZGV0ZXJtaW5lcyB0aGUgbnVtYmVyIG9mIHBvc3NpYmxlIGFycmFuZ2VtZW50cyBpbiBhIGNvbGxlY3Rpb24gb2YgaXRlbXMgd2hlcmUgdGhlIG9yZGVyIG9mIHRoZSBzZWxlY3Rpb24gZG9lcyAqKm5vdCoqIG1hdHRlcgoKJCQKXm5DX3IgPSBcZnJhY3tuIX17KG4tcikhciF9CiQkCgoqKlEuKiogbm8uIG9mIHdvbWVuID0gNSwgbm8uIG9mIG1lbiA9IDcuIEhvdyBtYW55IGRpZmZlcmVudCBjb21taXR0ZWVzIG9mIHR3byB3b21lbiBhbmQgdGhyZWUgbWVuIGNhbiBiZSBmb3JtZWQ/IFdoYXQgaWYgdHdvIG1lbiBhcmUgZmV1ZGluZyBhbmQgcmVmdXNlZCB0byBzZXJ2ZSBvbiB0aGUgc2FtZSBjb21taXR0ZWUgdG9nZXRoZXI/CgoqKkEuKiogRm9yIG5vIHJlc3RyaWN0aW9uOi0KJCheNUNfMikgKF43Q18zKSA9IDM1MCQgcG9zc2libGUgb3V0Y29tZXMKV2l0aCByZXN0cmljdGlvbnM6LQpGaW5kIG5vLiBvZiBjb21taXR0ZWVzIHdoZXJlIHRoZSB0d28gZmV1ZGluZyBtZW4gYXJlIHRvZ2V0aGVyOi0KJF41Q18xJCAsIGJlY2F1c2UgMSBtb3JlIG1hbiBmcm9tIHJlbWFpbmluZyA1IG1lbgpOby4gb2Ygd29tZW4gY2hvaWNlcyByZW1haW4gc2FtZSA6ICReNUNfMiQKU28sICQoXjVDXzEpICheNUNfKSA9IDUwJApTbyB0b3RhbCBvdXRjb21lIHdpdGggcmVzdHJpY3Rpb25zID0gYDM1MGAgLSBgNTBgID0gYDMwMGAKCi0tLQoKIyMgQmlub21pYWwgVGhlb3JlbQoKPiBNZXRob2Qgb2YgZXhwYW5kaW5nIGV4cHJlc3Npb24gcmFpc2VkIHRvIGZpbml0ZSBwb3dlcgoKJCQKKHgreSlebiA9IFxzdW1fe2s9MH1ebiB7Xm5DX2t4Xmt5XntuLWt9fQokJAoKLS0tCgotLS0KCiMgQ2hhcHRlciAyIDogQXhpb21zIG9mIFByb2JhYmlsaXR5CgojIyBTYW1wbGUgU3BhY2UgYW5kIEV2ZW50cwoKKipTYW1wbGUgU3BhY2UgOioqIHNldCBvZiBhbGwgcG9zc2libGUgb3V0Y29tZXMgb2YgYW4gZXhwZXJpbWVudC4gRGVub3RlZCBieSBgU2AuICAKKipVbmlvbiA6KiogJEFcY3VwIEIkID0gYWxsIGVsZW1lbnRzIGVpdGhlciBpbiBBIG9yIGluIEIgIAoqKkludGVyc2VjdGlvbiA6KiogJEFcY2FwIEIkID0gY29tbW9uIGVsZW1lbnRzIGJldHdlZW4gQSBhbmQgQiAgCioqU3Vic2V0IDoqKiAkQVxzdWJzZXQgQiQgPSBldmVyeSBvdXRjb21lIG9mIEEgaXMgYWxzbyBhbiBvdXRjb21lIG9mIEIgIAoqKlN1cGVyc2V0IDoqKiAkQSBcc3Vwc2V0IEIkID0gQSBjb250YWlucyBhbGwgb3V0Y29tZXMgb2YgQgoKIyMjIFJ1bGVzCgoxLiBDb21tdXRhdGl2ZSBMYXdzIDotICRBXGN1cCBCID0gQlxjdXAgQSQKMi4gQXNzb2NpYXRpdmUgTGF3cyA6LSAkKEFcY3VwIEIpIFxjdXAgQyA9IEFcY3VwIChCIFxjdXAgQykkCjMuIERpc3RyaWJ1dGl2ZSBMYXdzIDotICQoQVxjdXAgQilDID0gQUMgXGN1cCBCQyQKNC4gRGVNb3JnYW4ncyBMYXdzIDotCiAgIDEuICRcbmVnKEFcY3VwIEIpID0gXG5lZyBBIFxjYXAgXG5lZyBCJAogICAyLiAkXG5lZyhBXGNhcCBCKSA9IFxuZWcgQSBcY3VwIFxuZWcgQiQKCi0tLQoKIyMgQXhpb21zIG9mIFByb2JhYmlsaXR5CgoxLiBOb24tbmVnYXRpdml0eSAgCiAgIF9Qcm9iYWJpbGl0eSBvZiBhbnkgZXZlbnQgaXMgYWx3YXlzIG5vbiB6ZXJvLl8gIAogICAkUChBKSBcZ2VxIDAkCgoyLiBOb3JtYWxpemF0aW9uICAKICAgX1Byb2JhYmlsaXR5IG9mIGVudGlyZSBzYW1wbGUgc3BhY2UgaXMgMS5fICAKICAgJFAoUykgPSAxJAoKMy4gQWRkaXRpdml0eSAgCiAgIF9JZiB0d28gZXZlbnRzIGBBYCBhbmQgYEJgIGFyZSBtdXR1YWxseSBleGNsdXNpdmUsIHRoZSBwcm9iYWJpbGl0eSBvZiB0aGVpciB1bmlvbiBpcyB0aGUgc3VtIG9mIHRoZWlyIGluZGl2aWR1YWwgcHJvYmFiaWxpdGllc18gIAogICAkUChBXGN1cCBCKSA9IFAoQSkgKyBQKEIpJCB3aGVyZSAkQVxjYXAgQiA9IFxlbXB0eXNldCQKCioqRXguKiogQSBiaWFzZWQgY29pbiB0b3NzZWQsIHdoZXJlIGEgaGVhZCBpcyB0d2ljZSBhcyBsaWtlbHkgdG8gYXBwZWFyIGFzIGEgdGFpbCwgdGhlbiB3ZSB3b3VsZCBoYXZlLCAkUChce0hcfSkgPSBcZnJhY3syfXszfSQgYW5kICRQKFx7VFx9KSA9IFxmcmFjezF9ezN9JAoKLS0tCgojIyBTaW1wbGUgUHJvcG9zaXRpb25zCgoxLiBDb21wbGVtZW50IFJ1bGUgIAogICAkUChcbmVnIEEpID0gMSAtIFAoQSkkCgoyLiBBZGRpdGlvbiBSdWxlICAKICAgJFAoQSBcY3VwIEIpID0gUChBKSArIFAoQikgLSBQKEEgXGNhcCBCKSQKCjMuIE11bHRpcGxpY2F0aW9uIFJ1bGUgIAogICAkUChBXGNhcCBCKSA9IFAoQSkgKiBQKEIpJAoKNC4gQ29uZGl0aW9uYWwgUHJvYmFiaWxpdHkgIAogICBfUHJvYmFiaWxpdHkgb2YgZXZlbnQgYEFgIGdpdmVuIHRoYXQgZXZlbnQgYEJgIGhhcyBvY2N1cnJlZCBpc18gIAogICAkUChcZnJhY3tBfXtCfSkgPSBcZnJhY3tQKEFcY2FwIEIpfXtQKEIpfSQgaWYgJFAoQikgPiAwJAoKLS0tCgpUaGlzIG5vdGUgaXMgeWV0IHRvIGJlIGNvbXBsZXRlZCDwn5qnCg==";export{g as default};