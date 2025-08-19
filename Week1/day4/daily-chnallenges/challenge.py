import math

class Pagination:
    def __init__(self, items=None, page_size=10):
        # If no items given, default to empty list
        self.items = items if items is not None else []
        self.page_size = page_size
        self.current_idx = 0    

        # Calculate total pages
        self.total_pages = math.ceil(len(self.items) / self.page_size) if self.items else 1

    def get_visible_items(self):
        """Return items visible on the current page."""
        start = self.current_idx * self.page_size
        end = start + self.page_size
        return self.items[start:end]
       
    def go_to_page(self, page_num):
        """Jump to a specific page (1-based)."""
        if page_num < 1 or page_num > self.total_pages:
            raise ValueError("Page number out of range.")
        self.current_idx = page_num - 1
        return self
    
    def first_page(self):
        """Go to first page."""
        self.current_idx = 0
        return self

    def last_page(self):
        """Go to last page."""
        self.current_idx = self.total_pages - 1
        return self
    
    def previous_page(self):
        """Go one page back if possible."""
        if self.current_idx > 0:
            self.current_idx -= 1
        return self

    def next_page(self):
        """Go one page forward if possible."""
        if self.current_idx < self.total_pages - 1:
            self.current_idx += 1
        return self
    
    def __str__(self):
        """Return items on current page as string."""
        return "\n".join(str(item) for item in self.get_visible_items())


# ---------------- Test ----------------
alphabetList = list("abcdefghijklmnopqrstuvwxyz")
p = Pagination(alphabetList, 4)

print("First page:")
print(p.first_page())

print("\nPrevious page:")
print(p.previous_page())

print("\nGo to page 3:")
print(p.go_to_page(3))
