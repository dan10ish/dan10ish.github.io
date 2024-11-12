<hr>
🚧🚧🚧🚧🚧 This post is under development 🚧🚧🚧🚧🚧
<hr>
<br>

I have decided to implement the [neetcode roadmap](https://neetcode.io/roadmap) in two languages, `cpp` and `python`.

## Arrays and Hashing

1. [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)

```tabs
cpp
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_map<int, int> count;
        for (auto num : nums) {
            if(count[num] >= 1)
                return true;
            count[num]++;
        }
        return false;
    }
};
---python
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        return len(nums) != len(set(nums))
```

Time Complexity : `O(n)`

Space Complexity : `O(n)`
