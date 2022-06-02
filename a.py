a=["A","B","C","D"]
for i in a:
    for j in range(5,7):
        print(f"<div data-key='{i}{j}' class='tile hacker' >\n\tDo\n</div>")
a.append("E")
a.append("F")
for i in a:
    for j in range(1,7):
        print(f"<div data-key='{i}{j}' class='tile hacker'>\n\tDo\n</div>")


counter =1
for i in a:
    for j in range(1,5):
        print(f"{counter}:'{i}{j}'",end =',')
        counter+=1