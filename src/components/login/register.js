import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    navigate("/login");
  };

  const isValidUsername = (username) => {
    const regex = /^[a-zA-Z0-9]+$/; 
    return regex.test(username);
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regex.test(email);
  };

  const isValidPhone = (phone) => {
    const regex = /^[0-9]+$/; 
    return regex.test(phone);
  };

  const handleCreateAccount = async () => {
    setErrorUsername("");
    setErrorEmail("");
    setErrorPhone("");
    setError("");

    let valid = true;

    if (!isValidUsername(username)) {
      setErrorUsername("ユーザー名に特殊文字を含めることはできません。");
      valid = false;
    }
    if (!isValidEmail(email)) {
      setErrorEmail("メールの形式が正しくありません.");
      valid = false;
    }
    
    if (!valid) return; 

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "登録に失敗しました");
      }

      const data = await response.json();
      alert(data.message);
      navigate("/login", {
        state: { message: "無事に登録されました！ログインしてください." },
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="font-[sans-serif] bg-gray-50 flex items-center md:h-screen p-4">
      <div className="w-full max-w-4xl max-md:max-w-xl mx-auto">
        <div className="bg-white grid md:grid-cols-2 gap-16 w-full sm:p-8 p-6 shadow-md rounded-md overflow-hidden">
          <div className="max-md:order-1 space-y-6">
            <img src="/register.png" alt="Example" />
          </div>

          <form className="w-full">
            <div className="mb-8">
              <h3 className="text-gray-800 text-2xl font-bold">登録する</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">ユーザー名。</label>
                <div className="relative flex items-center">
                  <input
                    name="name"
                    type="text"
                    required
                    className="bg-white border border-gray-300 w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500"
                    placeholder="名前を入力"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                {errorUsername && <p className="text-red-500 text-sm">{errorUsername}</p>}
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">メールID</label>
                <div className="relative flex items-center">
                  <input
                    name="メール"
                    type="メール"
                    required
                    className="bg-white border border-gray-300 w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500"
                    placeholder="メールアドレスを入力"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errorEmail && <p className="text-red-500 text-sm">{errorEmail}</p>}
              </div>
     
              <div>
                <label className="text-gray-800 text-sm mb-2 block">パスワード</label>
                <div className="relative flex items-center">
                  <input
                    name="パスワード"
                    type="password"
                    required
                    className="bg-white border border-gray-300 w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500"
                    placeholder="パスワードを入力してください"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  id="私を覚えてますか"
                  name="私を覚えてますか"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md"
                />
                <label
                  htmlFor="私を覚えてますか"
                  className="text-gray-800 ml-3 block text-sm"
                >
                  私は受け入れます{" "}
                  <a
                    href="javascript:void(0);"
                    className="text-blue-600 font-semibold hover:underline ml-1"
                  >
                    利用規約
                  </a>
                </label>
              </div>
            </div>

            <div className="!mt-8">
              <button
                onClick={handleCreateAccount}
                type="button"
                className="w-full py-2.5 px-4 text-sm tracking-wider font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white focus:outline-none"
              >
                アカウントを作成する
              </button>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center">
              すでにアカウントをお持ちの場合?{" "}
              <a
                onClick={handleLogin}
                href="javascript:void(0);"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                ここからログイン
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;