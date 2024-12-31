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
  const [errorPassword, setErrorPassword] = useState("");
  const [error, setError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [termsError, setTermsError] = useState("");
  const [showTerms, setShowTerms] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const isValidUsername = (username) => {
    const regex = /^[a-zA-Z0-9]{8,}$/;
    return regex.test(username);
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleCreateAccount = async () => {
    setErrorUsername("");
    setErrorEmail("");
    setErrorPassword("");
    setTermsError("");
    setError("");

    let valid = true;

    if (!isValidUsername(username)) {
      setErrorUsername("ユーザー名は8文字以上で、特殊文字を含めることはできません。");
      valid = false;
    }

    if (!isValidPassword(password)) {
      setErrorPassword("パスワードは8文字以上である必要があります。");
      valid = false;
    }

    if (!isValidEmail(email)) {
      setErrorEmail("メールの形式が正しくありません。");
      valid = false;
    }

    if (!acceptTerms) {
      setTermsError("利用規約に同意する必要があります。");
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

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "登録に失敗しました。もう一度お試しください。");
        return;
      }

      alert("登録が完了しました！");
      navigate("/login", {
        state: { message: "無事に登録されました！ログインしてください。" },
      });
    } catch (err) {
      alert("エラーが発生しました。もう一度お試しください。");
      setError(err.message);
    }
  };

  // Modal component for terms and conditions
  const TermsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">利用規約</h3>
            <button 
              onClick={() => setShowTerms(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="prose">
            <h4 className="text-lg font-semibold mb-2">1. 利用規約の適用</h4>
            <p className="mb-4">
              本利用規約は、当社が提供するすべてのサービスの利用に関する条件を定めるものです。
            </p>

            <h4 className="text-lg font-semibold mb-2">2. サービスの利用</h4>
            <p className="mb-4">
              ユーザーは本サービスの利用にあたり、以下の行為を行ってはならないものとします：
              • 法令または公序良俗に違反する行為
              • 犯罪行為に関連する行為
              • 当社のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
              • 当社のサービスの運営を妨害するおそれのある行為
            </p>

            <h4 className="text-lg font-semibold mb-2">3. アカウント管理</h4>
            <p className="mb-4">
              ユーザーは、自己の責任においてアカウントを管理するものとし、
              アカウントの不正使用により生じた損害について、当社は一切の責任を負わないものとします。
            </p>

            <h4 className="text-lg font-semibold mb-2">4. プライバシー</h4>
            <p className="mb-4">
              当社は、ユーザーのプライバシー情報を適切に管理し、
              法令に定める場合を除き、ユーザーの同意なく第三者に提供することはありません。
            </p>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowTerms(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
                <label className="text-gray-800 text-sm mb-2 block">ユーザー名</label>
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
                {errorPassword && <p className="text-red-500 text-sm">{errorPassword}</p>}
              </div>
              <div className="flex items-center">
                <input
                  id="私を覚えてますか"
                  name="私を覚えてますか"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md"
                />
                <label
                  htmlFor="私を覚えてますか"
                  className="text-gray-800 ml-3 block text-sm"
                >
                  私は受け入れます{" "}
                  <button
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="text-blue-600 font-semibold hover:underline ml-1"
                  >
                    利用規約
                  </button>
                </label>
              </div>
              {termsError && <p className="text-red-500 text-sm">{termsError}</p>}
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
      {showTerms && <TermsModal />}
    </div>
  );
};

export default Register;