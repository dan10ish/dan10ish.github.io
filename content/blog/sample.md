Code block tabbing

```tabs
javascript
// Recursive function to find factorial
const factorial = (n) => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
};
console.log(factorial(5)); // Output: 120
---python
# Recursive function to find factorial
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # Output: 120
---java
public class Main {
    public static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        System.out.println(factorial(5)); // Output: 120
    }
}
---cpp
#include <iostream>

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    std::cout << factorial(5) << std::endl; // Output: 120
    return 0;
}
---rust
fn factorial(n: u64) -> u64 {
    if n <= 1 {
        return 1;
    }
    n * factorial(n - 1)
}

fn main() {
    println!("{}", factorial(5)); // Output: 120
}
---go
package main

import "fmt"

func factorial(n int) int {
    if n <= 1 {
        return 1
    }
    return n * factorial(n - 1)
}

func main() {
    fmt.Println(factorial(5)) // Output: 120
}
---ruby
def factorial(n)
  return 1 if n <= 1
  n * factorial(n - 1)
end

puts factorial(5) # Output: 120
---typescript
function factorial(n: number): number {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

console.log(factorial(5)); // Output: 120
---csharp
using System;

class Program {
    static int Factorial(int n) {
        if (n <= 1) return 1;
        return n * Factorial(n - 1);
    }

    static void Main() {
        Console.WriteLine(Factorial(5)); // Output: 120
    }
}
---php
<?php
function factorial($n) {
    if ($n <= 1) return 1;
    return $n * factorial($n - 1);
}

echo factorial(5); // Output: 120
?>
---lua
function factorial(n)
    if n <= 1 then
        return 1
    end
    return n * factorial(n - 1)
end

print(factorial(5)) -- Output: 120
```
