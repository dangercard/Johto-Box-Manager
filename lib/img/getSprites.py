import os
import math

for i in range(1,252):
    if(int(math.log10(i))+1 == 1):
        num = '00' + str(i)

    elif(int(math.log10(i))+1 == 2):
        num = '0' + str(i)
    
    else:
        num = str(i)
    

    os.system('wget https://www.serebii.net/pokearth/sprites/crystal/' + num + '.png')