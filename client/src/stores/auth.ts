import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'
import type { User } from '@/types/user.types.ts'
import myFetch from '@/helpers/myFetch.ts'
import type { AuthResponse } from '@/types/auth-response.types.ts'
import router from '@/router'

interface AuthData {
  accessToken: string,
  refreshToken: string,
  user: User,
}

export const useAuthStore = defineStore('auth', () => {
  const accessToken: Ref<string, string> = ref('');
  const refreshToken: Ref<string, string> = ref('');
  const user: Ref<User | null, User | null> = ref(null);
  load();

  async function login(login: string, password: string): Promise<void> {
    myFetch('auth/login', { login, password }, 'POST')
      .then(res => {
        setup(res.response.value as AuthResponse);
        router.push('/main');
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function refresh(): Promise<void> {
    myFetch('auth/refresh', undefined, 'GET', refreshToken.value)
      .then(res => {
        console.log(res.response.value);
        setup(res.response.value as AuthResponse);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function setup(response: AuthResponse) {
    accessToken.value = response.accessToken;
    refreshToken.value = response.refreshToken;
    user.value = response.user;
    save();
  }

  async function logout(): Promise<void> {
    myFetch('auth/logout', {}, 'GET', accessToken.value )
      .then(() => {
        accessToken.value = '';
        refreshToken.value = '';
        user.value = null;
      })
      .catch(error => {
        console.log(error);
      })
  }

  function save(): void {
    localStorage.setItem('authData', JSON.stringify({
      accessToken: accessToken.value,
      refreshToken: refreshToken.value,
      user: user.value,
    }));
  }

  async function  load(): Promise<void> {
    const storedData = localStorage.getItem('authData');
    if (storedData) {
      try {
        const data: AuthData = JSON.parse(storedData) as AuthData;
        accessToken.value = data.accessToken;
        refreshToken.value = data.refreshToken;
        user.value = data.user;
        await check();
      } catch ( error ) {
        console.log(error);
      }
    }
  }

  async function check(): Promise<void> {
    console.log('Checking auth data');
    myFetch('auth/check', undefined, 'GET', accessToken.value)
      .then((res) => {
        const result: any = res.response.value;
        if (result?.statusCode === 401) {
          refresh();
        }
      })
      .catch(error => {
          console.log(error);
      });
  }

  return { accessToken, refreshToken, user, login, load, logout };
});
