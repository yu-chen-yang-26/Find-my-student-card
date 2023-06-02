import jwt from "jsonwebtoken";
const JWT_SECRET = "PUI-final-project-group9";
const verify = async (req, res, next) => {
  try {
    // 從來自客戶端請求的 header 取得和擷取 JWT
    const token = req.header("Authorization").replace("Bearer ", "");
    // 驗證 Token
    const decoded = jwt.verify(token, JWT_SECRET);
    // 找尋符合用戶 id 和 Tokens 中包含此 Token 的使用者資料
    // 若沒找到此用戶，丟出錯誤
    if (!decoded.user) {
      throw new Error();
    }
    // 將 token 存到 req.token 上供後續使用
    req.token = token;
    // 將用戶完整資料存到 req.user 上供後續使用
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default verify;
