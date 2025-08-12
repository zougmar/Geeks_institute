brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": "blue",
        "Spain": "red",
        "US": ["pink", "green"]
    }
}

brand["number_stores"] = 2

print(brand)

print("Zara's clients are:", ", ".join(brand["type_of_clothes"]))

brand["country_creation"] = "Spain"

if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")
print(brand["international_competitors"])
del brand["creation_date"]
print(brand)
print("The last international competitor is:", brand["international_competitors"][-1])
print("The major colors in the US are:", ", ".join(brand["major_color"]["US"]))
print(len(brand))
print(brand.keys())
more_on_zara = {
    "creation_date": 1975,
    "number_stores": 10000
}
brand.update(more_on_zara)
print(brand)
print(brand["number_stores"])