import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Welcome to the Homepage!");
});

router.get("/about", (req, res) => {
    res.send("About Us: this is the about page.");
});

export default router;
