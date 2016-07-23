#include <stdio.h>

int main(int argc, char *argv[] )
{
  int i;
  if (argc != 0)
  {
    for (i = 0; i < argc; i++)
    {
      printf("\n%s", argv[i]);
    }
  }  
  return 0;
}
