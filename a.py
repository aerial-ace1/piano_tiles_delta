a=["A","B","C","D"]
for i in a:
    for j in range(5,7):
        print(f"<button data-key='{i}{j}' class='tile none' >\n\tDo\n</button>")
b=["E","F"]
for i in b:
    for j in range(1,7):
        print(f"<button data-key='{i}{j}' class='tile none'>\n\tDo\n</button>")


counter =1
for i in a:
    for j in range(1,5):
        print(f"{counter}:'{i}{j}'",end =',')
        counter+=1