<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Logo Section -->
      <div class="login-header">
        <div class="logo-circle">
          <img src="../../public/images/UPANGLOGO.png" alt="UpSmart Canteen Logo" class="login-logo" />
        </div>
        <h1 class="login-title">UpSmart Canteen</h1>
      </div>

      <!-- Form Section -->
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email" class="form-label">Email Address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="form-input"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="form-input"
            placeholder="Enter your password"
            required
          />
        </div>

        <div class="form-options">
          <label class="checkbox">
            <input v-model="rememberMe" type="checkbox" />
            <span>Remember me</span>
          </label>
          <a href="#" class="forgot-password">Forgot Password?</a>
        </div>

        <button type="submit" class="login-button" :disabled="isLoading">
          <span v-if="!isLoading">Sign in</span>
          <span v-else>Signing in...</span>
        </button>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>

      <!-- Footer Section -->
      <div class="login-footer">
        <p class="footer-text">© 2026 UpSmart Canteen. All rights reserved.</p>
      </div>
    </div>

    <!-- Decorative Background -->
    <div class="background-decoration"></div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Login',
  emits: ['login'],
  setup(props, { emit }) {
    const email = ref('')
    const password = ref('')
    const rememberMe = ref(false)
    const isLoading = ref(false)
    const errorMessage = ref('')

    const handleLogin = async () => {
      errorMessage.value = ''
      isLoading.value = true

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // TODO: Replace with actual authentication logic, for testing palang to
        if (email.value && password.value) {
          emit('login', {
            email: email.value,
            rememberMe: rememberMe.value
          })
        } else {
          errorMessage.value = 'Please enter both email and password'
        }
      } catch (error) {
        errorMessage.value = 'Login failed. Please try again.'
      } finally {
        isLoading.value = false
      }
    }

    return {
      email,
      password,
      rememberMe,
      isLoading,
      errorMessage,
      handleLogin
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f1e8 0%, #fdfcf9 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.background-decoration {
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(45, 80, 22, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  top: -100px;
  right: -100px;
  pointer-events: none;
}

.login-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(45, 80, 22, 0.08);
  padding: 48px 40px;
  width: 100%;
  max-width: 420px;
  position: relative;
  z-index: 1;
}

/* Header Section */
.login-header {
  text-align: center;
  margin-bottom: 36px;
}

.logo-circle {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #2d5016 0%, #1a3308 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(45, 80, 22, 0.2);
}

.login-logo {
  width: 50px;
  height: 50px;
  filter: brightness(0) invert(1);
}

.login-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: 28px;
  color: var(--upang-green);
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}


/* Form Section */
.login-form {
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--charcoal);
  margin-bottom: 8px;
  letter-spacing: 0.3px;
}

.form-input {
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid #e0dbd3;
  border-radius: 8px;
  font-family: 'Work Sans', sans-serif;
  font-size: 14px;
  color: var(--charcoal);
  background: #fafaf8;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--upang-green);
  background: white;
  box-shadow: 0 0 0 3px rgba(45, 80, 22, 0.1);
}

.form-input::placeholder {
  color: var(--mid-gray);
}

/* Form Options */
.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  font-size: 13px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: var(--charcoal);
  font-weight: 500;
}

.checkbox input {
  cursor: pointer;
  width: 16px;
  height: 16px;
  accent-color: var(--upang-green);
}

.forgot-password {
  color: var(--upang-green);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.forgot-password:hover {
  color: var(--upang-gold);
}

/* Login Button */
.login-button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #2d5016 0%, #1a3308 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Work Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.4px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(45, 80, 22, 0.2);
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(45, 80, 22, 0.3);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Error Message */
.error-message {
  color: #c84747;
  font-size: 13px;
  margin-top: 16px;
  text-align: center;
  font-weight: 500;
}

/* Footer Section */
.login-footer {
  border-top: 1px solid #e0dbd3;
  padding-top: 20px;
  text-align: center;
}

.footer-text {
  font-size: 12px;
  color: var(--mid-gray);
  margin: 0;
}

/* Responsive Design */
@media (max-width: 480px) {
  .login-card {
    padding: 36px 24px;
  }

  .login-title {
    font-size: 24px;
  }

  .logo-circle {
    width: 70px;
    height: 70px;
  }

  .login-logo {
    width: 44px;
    height: 44px;
  }
}
</style>
