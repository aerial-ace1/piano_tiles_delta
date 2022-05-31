a=["A","B","C","D"]
for i in a:
    for j in range(1,5):
        print(f"<div data-key='{i}{j}' class='tile'>\n\tDo\n</div>")


counter =1
for i in a:
    for j in range(1,5):
        print(f"{counter}:'{i}{j}'",end =',')
        counter+=1