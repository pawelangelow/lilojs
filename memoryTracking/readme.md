# Compiling

When compiling, it is important to **not** pass `-O` flag (`-o` is ok), because it makes optimization. [More here](https://gcc.gnu.org/onlinedocs/gcc/Optimize-Options.html).

# Track memory

For memory tracking will be used the `/usr/bin/time -v` command. For example: `/usr/bin/time -v ./some-executable`

And check `Maximum resident set size (kbytes): 1356` which gives the memory used. It is not very precise, but for big numbers, etc big consumption it's kind of ok.

### Static

For example in the code when **10** items in array we get value of `1324`, when **10 000** items the value is `1452` but when **1 000 000** value is `5212`.

### Dynamic allocation

For example in the code when **10** items in array we get value of `1148`, when **1000** items the value is `2164` but when **100000** value is `103448`.

# Future

Improve static memory measurement.

