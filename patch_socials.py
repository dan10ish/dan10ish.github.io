import re

with open("app/page.tsx", "r") as f:
    text = f.read()

# Replace the ul definition
text = text.replace(
    '<ul className="flex flex-col gap-1.5 list-none p-0 m-0 -ml-2.5">',
    '<ul className="grid grid-cols-2 gap-3 list-none p-0 m-0">'
)

# And replace the li and a tags
old_li = """
                  <li key={index} className="flex items-center">
                    <a
                      href={item.url}
                      target={isEmail ? undefined : "_blank"}
                      rel={isEmail ? undefined : "noopener noreferrer"}
                      className={`social-link inline-flex items-center gap-1.5 text-[15px] font-normal leading-snug px-2.5 py-1 rounded-md ${
                        isEmail ? "email-social-link" : ""
                      }`}
                    >"""

new_li = """
                  <li key={index} className="flex items-center justify-between border border-border rounded-xl shadow-sm bg-background hover:bg-foreground/[0.03] transition-colors group px-3 py-2.5 w-full">
                    <a
                      href={item.url}
                      target={isEmail ? undefined : "_blank"}
                      rel={isEmail ? undefined : "noopener noreferrer"}
                      className={`social-link w-full flex items-center justify-between gap-1.5 text-[14px] font-normal leading-snug outline-none ${
                        isEmail ? "email-social-link pr-2" : ""
                      }`}
                    >"""

text = text.replace(old_li, new_li)

with open("app/page.tsx", "w") as f:
    f.write(text)
