import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import googleIcon from '../assets/images/google.png';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import '../styles/AuthPage.css';

const AuthPage = ({ mode = 'login' }) => {
  const isLogin = mode === 'login';
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: 'customer',
        createdAt: serverTimestamp(),
      }, { merge: true });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, 'users', form.email);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        alert('User already exists. Please login instead.');
        navigate('/login');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.email), {
        uid: user.uid,
        name: form.name,
        email: form.email,
        createdAt: serverTimestamp(),
        role: 'customer',
      });

      alert('Account created successfully!');
      navigate('/');
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        alert('User already exists. Please login.');
      } else {
        alert('Signup failed. Try again.');
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="auth-hero">
          <div className="auth-kicker">SGN Pharmacy</div>
          <h1 className="auth-title">{isLogin ? 'Welcome back' : 'Create your account'}</h1>
          <p className="auth-copy">
            {isLogin
              ? 'Sign in to track orders, save prescriptions, and keep shopping fast.'
              : 'Join SGN Pharmacy for faster checkout, prescription uploads, and premium care.'}
          </p>
          <div className="auth-points">
            <div className="auth-point">Fast reorders and saved prescriptions</div>
            <div className="auth-point">Secure checkout with a polished pharmacy experience</div>
            <div className="auth-point">Google sign in available in one tap</div>
          </div>
        </div>

        <div className="auth-form-panel">
          <h2 className="auth-form-title">{isLogin ? 'Login' : 'Sign up'}</h2>
          <p className="auth-form-subtitle">{isLogin ? 'Access your pharmacy dashboard.' : 'Start your SGN account in seconds.'}</p>

          <form className="auth-form" onSubmit={isLogin ? handleEmailLogin : handleSignup}>
            {!isLogin && (
              <div className="auth-field">
                <label>Full name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
            )}
            <div className="auth-field">
              <label>Email address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>

            <button type="submit" className="auth-primary-btn">
              {isLogin ? 'Login' : 'Create account'}
            </button>

            <div className="auth-divider">or</div>

            <button type="button" className="auth-google-btn" onClick={handleGoogleLogin}>
              <img src={googleIcon} alt="Google" height="20px" />
              Continue with Google
            </button>
          </form>

          <div className="auth-switch">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <RouterLink to={isLogin ? '/signup' : '/login'}>{isLogin ? 'Sign up' : 'Login'}</RouterLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
