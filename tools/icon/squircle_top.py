# Apple-style continuous corner (Figma corner smoothing 0.6) in a 48x48 square, corner span p = 20 (the mask-box-image slice)
import math
W, P, S = 48.0, 20.0, 0.6
R = P / (1 + S)
arc = 90 * (1 - S)
L = math.sin(math.radians(arc / 2)) * R * math.sqrt(2)
alpha = (90 - arc) / 2
p34 = R * math.tan(math.radians(alpha / 2))
beta = 45 * S
c = p34 * math.cos(math.radians(beta)); d = c * math.tan(math.radians(beta))
b = (P - L - c - d) / 3; a = 2 * b
def bez(p0, p1, p2, p3, n):
    out = []
    for i in range(1, n + 1):
        t = i / n; u = 1 - t
        out.append(tuple(u**3*p0[k] + 3*u*u*t*p1[k] + 3*u*t*t*p2[k] + t**3*p3[k] for k in range(2)))
    return out
# top-right corner, y down, from (W-P, 0) to (W, P)
P0 = (W - P, 0.0); P3 = (P0[0] + a + b + c, d)
pts = [P0] + bez(P0, (P0[0] + a, 0), (P0[0] + a + b, 0), P3, 10)
C = (W - R, R)
a0 = math.atan2(P3[1] - C[1], P3[0] - C[0]); P4 = (P3[0] + L, P3[1] + L); a1 = math.atan2(P4[1] - C[1], P4[0] - C[0])
assert abs(math.hypot(P3[0]-C[0], P3[1]-C[1]) - R) < 1e-6 and abs(math.hypot(P4[0]-C[0], P4[1]-C[1]) - R) < 1e-6
for i in range(1, 9):
    t = a0 + (a1 - a0) * i / 8; pts.append((C[0] + R * math.cos(t), C[1] + R * math.sin(t)))
pts += bez(P4, (P4[0] + d, P4[1] + c), (P4[0] + d, P4[1] + b + c), (W, P), 10)
assert abs(pts[-1][0] - W) < 1e-9 and abs(pts[-1][1] - P) < 1e-9
tr = pts
br = [(x, W - y) for x, y in reversed(tr)]          # bottom-right: (W, W-P) -> (W-P, W)
bl = [(W - x, y) for x, y in reversed(br)]          # bottom-left: (P, W) -> (0, W-P)
tl = [(W - x, y) for x, y in reversed(tr)]          # top-left: (0, P) -> (P, 0)
f = lambda v: ('%.2f' % v)
seq = tr + [(W, W), (0, W)] + tl
d_attr = 'M' + ' L'.join(f(x) + ' ' + f(y) for x, y in seq) + 'Z'
print("R=%.3f p=%.1f  45deg inset=%.3f (circle r=P would be %.3f)" % (R, P, W - (C[0] + R * math.cos(math.radians(-45))), P * (1 - 1/math.sqrt(2))))
svg = "<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'><path d='" + d_attr + "'/></svg>"
open('/tmp/squircle-top.svg', 'w').write(svg)
open('/tmp/squircle-top.css', 'w').write('url("data:image/svg+xml,' + svg.replace('<', '%3C').replace('>', '%3E') + '")')
print(len(seq), 'points')
