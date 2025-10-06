import db from '../config/db.js';

export const UserModel = {
  async createUserTransaction(user, hashedPassword) {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run('BEGIN TRANSACTION');

        const insertUser = `INSERT INTO users (email, username, first_name, last_name)
                            VALUES (?, ?, ?, ?)`;

        db.run(insertUser, [user.email, user.username, user.first_name, user.last_name], function (err) {
          if (err) {
            db.run('ROLLBACK');
            return reject(err);
          }

          const userId = this.lastID;
          const insertHash = `INSERT INTO hashpwd (user_id, username, password) VALUES (?, ?, ?)`;
          db.run(insertHash, [userId, user.username, hashedPassword], function (err2) {
            if (err2) {
              db.run('ROLLBACK');
              return reject(err2);
            }

            db.run('COMMIT', (err3) => {
              if (err3) {
                db.run('ROLLBACK');
                return reject(err3);
              }
              resolve({ id: userId });
            });
          });
        });
      });
    });
  },

  findHashByUsername(username) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM hashpwd WHERE username = ?`, [username], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  getAllUsers() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT id, email, username, first_name, last_name FROM users`, [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  getUserById(id) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT id, email, username, first_name, last_name FROM users WHERE id = ?`, [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  updateUserById(id, userData) {
    const { email, username, first_name, last_name } = userData;
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE users SET email=?, username=?, first_name=?, last_name=? WHERE id=?`;
      db.run(sql, [email, username, first_name, last_name, id], function (err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      });
    });
  }
};
