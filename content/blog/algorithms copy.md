### Math Basics

#### 1. Binary Conversions

- Binary to integer:
  `binary digit` \* $2^{position}$ \
  Example:

  $$
  1011 = (1 * 2^{3}) + (0 * 2^{2}) + (1 * 2^{1}) + (1 * 2^{0})
  = 8 + 0 + 2 + 1 = 11
  $$

- Integer to Binary:
  - Divide the integer by 2 and note the remainder
  - Repeat until quotient = 0
  - Write remoainders in reverse order \
  Example: $1011$
  <table>
    <thead>
      <tr>
        <th>Step</th>
        <th>Division</th>
        <th>Quotient</th>
        <th>Remainder</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>1</th>
        <td>11 &divide; 2</td>
        <td>5</td>
        <td>1</td>
      </tr>
      <tr>
        <th>2</th>
        <td>5 &divide; 2</td>
        <td>2</td>
        <td>1</td>
      </tr>
      <tr>
        <th>3</th>
        <td>2 &divide; 2</td>
        <td>1</td>
        <td>0</td>
      </tr>
      <tr>
        <th>4</th>
        <td>1 &divide; 2</td>
        <td>0</td>
        <td>1</td>
      </tr>
    </tbody>
    <caption><code>11 => 1011</code></caption>
  </table>

#### 2. Logarithms

$$
  \ln_{x}(y) = x^{y}
$$

To what power we must raise $x$ (base) to get $y$.
Example:

- $\ln_{2}(8) = 3 ,i.e., 2^{3} = 8$
- $\ln_{4}(16) = 2, i.e., 4^{2} = 16$

#### 3. Arithmetic sequence
- Sum: 