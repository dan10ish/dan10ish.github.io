"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2561],{72561:function(n,t,e){e.r(t),t.default="I have decided to implement the [neetcode roadmap](https://neetcode.io/roadmap) in two languages, `cpp` and `python`.\n\n## Arrays and Hashing\n\n1. [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)\n\n```tabs\ncpp\nclass Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        unordered_map<int, int> count;\n        for (auto num : nums) {\n            if(count[num] >= 1)\n                return true;\n            count[num]++;\n        }\n        return false;\n    }\n};\n---python\nclass Solution:\n    def containsDuplicate(self, nums: List[int]) -> bool:\n        return len(nums) != len(set(nums))\n```\n\nTime Complexity : `O(n)`\n\nSpace Complexity : `O(n)`\n"}}]);