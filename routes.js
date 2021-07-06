const express = require("express");
const routes = express.Router();

/* routes */
routes.get("/", (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        conn.query("SELECT * FROM users", (err, data) => {
            if (err) return res.send(err);
            res.json(data);
        });
    });
});


routes.get("/user/:id", (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query("SELECT * FROM users WHERE user_id = ?", [req.params.id],
            (err, data) => {
                if (err) return res.send(err);
                res.send(data);
            });
    });
});

routes.post("/", (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query("INSERT INTO users set ?", [req.body],
            (err, data) => {
                if (err) return res.send(err);
                res.send(data);
            });
    });
});

routes.delete("/:id", (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query("DELETE FROM users WHERE user_id = ?", [req.params.id],
            (err, data) => {
                if (err) return res.send(err);
                /* res.send("Deleted"); */
                res.send(data);
            });
    });
});

routes.put("/:id", (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query("UPDATE users set ? WHERE user_id = ?", [req.body, req.params.id],
            (err, data) => {
                if (err) return res.send(err);
                res.send(data);
            });
    });
});

/* Ultimo id de users */
/* ;  */
routes.get("/user", (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query("SELECT MAX(user_id) AS user_id FROM users", (err, data) => {
                if (err) return res.send(err);
                res.send(data);
            });
    });
});

/* Poems */
routes.get("/poems/:id", (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query("SELECT * FROM poems WHERE user_id = ?", [req.params.id],
            (err, data) => {
                if (err) return res.send(err);
                res.json(data);
            });
    });
});

routes.post("/poems", (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query("INSERT INTO poems set ?", [req.body],
            (err, data) => {
                if (err) return res.send(err);
                res.send(data);
            });
    });
});

routes.delete("/poems/:id", (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query("DELETE FROM poems WHERE poem_id = ?", [req.params.id],
            (err, data) => {
                if (err) return res.send(err);
                /* res.send("Deleted"); */
                res.send(data);
            });
    });
});

routes.put("/poems/:id", (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query("UPDATE poems set ? WHERE poem_id = ?", [req.body, req.params.id],
            (err, data) => {
                if (err) return res.send(err);
                res.send(data);
            });
    });
});




/* categorias */

routes.get("/category", (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        conn.query("SELECT * FROM categories", (err, data) => {
            if (err) return res.send(err);
            res.json(data);
        });
    });
});


routes.get("/category/:id", (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query("SELECT * FROM categories WHERE category_id = ?", [req.params.id],
            (err, data) => {
                if (err) return res.send(err);
                res.send(data);
            });
    });
});

routes.post("/category", (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query("INSERT INTO categories set ?", [req.body],
            (err, data) => {
                if (err) return res.send(err);
                res.send(data);
            });
    });
});

routes.delete("/category/:id", (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query("DELETE FROM categories WHERE category_id = ?", [req.params.id],
            (err, data) => {
                if (err) return res.send(err);
                /* res.send("Deleted"); */
                res.send(data);
            });
    });
});

routes.put("/category/:id", (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query("UPDATE categories set ? WHERE category_id = ?", [req.body, req.params.id],
            (err, data) => {
                if (err) return res.send(err);
                res.send(data);
            });
    });
});

/* Token */
routes.post("/token", (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query("INSERT INTO tokens set ?", [req.body],
            (err, data) => {
                if (err) return res.send(err);
                res.send(data);
            });
    });
});

routes.delete("/token/:id", (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query("DELETE FROM tokens WHERE token_id = ?", [req.params.id],
            (err, data) => {
                if (err) return res.send(err);
                /* res.send("Deleted"); */
                res.send(data);
            });
    });
});


module.exports = routes;

