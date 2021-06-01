# Paint app

This is a simple react app which draw lines, rectangles, fill color(like 'Paint').

## Input file

To draw something you should upload a .txt file with instructions.

#### Example

C 20 15\
L 1 1 5 1\
R 3 5 14 10\
B 1 1 'm'\

#### Commands

C x y - create canvas where x - columns, y - rows. (required)\
L x y x1 y1 - draw line between two points. You can draw as many as you wish\
R x y x1 y1 - draw rectangle from top left corner to bottom right corner.\
B x y 'm' - fill with color where x y - point on canvas, 'm' - color 
