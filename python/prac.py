def hcf(a, b):
    if b == 0:
        return a
    else:
        return hcf(b, a % b)
def lcm(a, b):
    return (a * b) // hcf(a, b)
n = [8, 6, 12, 18]  
ans = n[0]
for num in n[1:]:
    ans = lcm(ans, num)
print("HCF of first two numbers:", hcf(n[0], n[1]))
print("LCM of the set:", ans)
