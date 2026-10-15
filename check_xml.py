from lxml import etree
xml = etree.parse("students.xml")
dtd = etree.DTD("students.dtd")
if dtd.validate(xml):
    print("XML is valid")
else:
    print("XML is invalid")
    print(dtd.error_log)
xsl = etree.parse("students.xsl")
transform = etree.XSLT(xsl)
result = transform(xml)
with open("students.html", "w", encoding="utf-8") as f:
    f.write(str(result))
print("XSLT transformation completed")
print("Open students.html in your browser")