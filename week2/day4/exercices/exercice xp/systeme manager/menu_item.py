from db_config import get_connection

class MenuItem:
    def __init__(self, name, price):
        self.name = name
        self.price = price
    
    def save(self):
        conn = get_connection()
        cursor = conn.cursor()
        query = "INSERT INTO Menu_Items (item_name, item_price) VALUES (%s, %s)"
        cursor.execute(query, (self.name, self.price))
        conn.commit()
        cursor.close()
        conn.close()

    def delete(self):
        conn = get_connection()
        cursor = conn.cursor()
        query = "DELETE FROM Menu_Items WHERE item_name = %s"
        cursor.execute(query, (self.name,))
        conn.commit()
        cursor.close()
        conn.close()

    def update(self, new_name, new_price):
        conn = get_connection()
        cursor = conn.cursor()
        query = "UPDATE Menu_Items SET item_name = %s, item_price = %s WHERE item_name = %s"
        cursor.execute(query, (new_name, new_price, self.name))
        conn.commit()
        cursor.close()
        conn.close()
