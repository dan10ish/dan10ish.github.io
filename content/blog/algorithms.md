This blog contains major algorithms implemented in python needed for competitive programming or to crack interviews.

Python familiarity is needed as this is not beginner friendly.

Algorithms are implemented from the book [Competitive Programing in Python](https://www.cambridge.org/tz/universitypress/subjects/computer-science/algorithmics-complexity-computer-algebra-and-computational-g/competitive-programming-python-128-algorithms-develop-your-coding-skills?format=PB&isbn=9781108716826).

## Matrices

- **Matrix Multiplication** Matrix multiplication $AB$ between two $n \times n$ matrices results in another $n \times n$ matrix, where each element is calculated as:
  $$
  (AB){ij} = \sum{k=0}^{n-1} A_{ik} \times B_{kj}
  $$

#### 1. [Frievald's Algorithm](https://en.wikipedia.org/wiki/Freivalds%27_algorithm)

To check matrix multiplication, $AB = C$ in $O(n^2)$ instead of $O(n^3)$ by randomly choosing a vector $x$ and testing $A(Bx) = Cx$.

```python
from random import randint
from sys import stdin

def readint():
  return int(stdin.readline())

def readarray(typ):
  return list(map(typ, stdin.readline().split()))

def readmatrix(n):
  M = []
  for _ in range(n):
    row = readarray(int)
    assert len(row) == n
    M.append(row)
  return M

def mult(M, v):
  n = len(M)
  return [sum(M[i][j] * v[j] for j in range(n)) for i in range(n)]

def freivalds(A, B, C):
  n = len(A)
  x = [randint(0, 1000000) for j in range(n)]
  return mult(A, mult(B, x)) == mult(C, x)

if __name__ == "__main__":
  n = readint()
  A = readmatrix(n)
  B = readmatrix(n)
  C = readmatrix(n)
  print(freivalds(A, B, C))
```

Input:

```txt
2      # value of n in n by n matrices
1 2    # a11 a12
3 4    # a21 a22
5 6    # b11 b12
7 8    # b21 b22
9 10   # c11 c12
11 12  # c21 c22
```

Output: `False`

TC : $O(n^2)$ & SC : $O(n)$
