import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'
import type { User } from '@/types/user.types.ts'
import myFetch from '@/helpers/myFetch.ts'
import type { TAuthResponse } from '@/types/auth-response.types.ts'
import router from '@/router'
import type { RegisterUserDto } from '../../../server/src/shared/dto/register-user.dto.ts';
import { SITE_CONTROLLERS, SITE_ROUTES } from '../../../server/src/shared/constants/site-routes.constants.ts';

interface AuthData {
	accessToken: string,
	refreshToken: string,
	user: User,
}

export const useAuthStore = defineStore('auth', () => {
	const accessToken: Ref<string, string> = ref('');
	const refreshToken: Ref<string, string> = ref('');
	const user: Ref<User | null, User | null> = ref(null);
	const siteRoute = SITE_CONTROLLERS.AUTH;
	let isNeedRemember: boolean = false;
	//load().then();

	async function login(login: string, password: string, rememberUser: boolean = false): Promise<void> {
		myFetch(`${siteRoute}/${SITE_ROUTES.LOGIN}`, { login, password }, 'POST')
			.then(res => {
				isNeedRemember = rememberUser;
				setup(res.response.value as TAuthResponse);
				router.push('/main');
			})
			.catch(error => {
				console.log(error);
			});
	}

	async function register(dto: RegisterUserDto, rememberUser: boolean = false): Promise<void> {

		myFetch(`${siteRoute}/${SITE_ROUTES.REGISTER}`, dto, 'POST')
			.then(res => {
				isNeedRemember = rememberUser;
				setup(res.response.value as TAuthResponse);
				router.push('/main');
			})
			.catch(error => {
				console.log(error);
			});
	}

	async function refresh(): Promise<void> {
		myFetch(`${siteRoute}/${SITE_ROUTES.REFRESH}`, undefined, 'GET', refreshToken.value)
			.then(res => {
				const response = res.response.value as TAuthResponse;
				if (response?.statusCode === 401) return;
				setup(response);
			})
			.catch(error => {
				console.log(error);
			});
	}

	function setup(response: TAuthResponse) {
		accessToken.value = response.accessToken;
		refreshToken.value = response.refreshToken;
		user.value = response.user;
		if (isNeedRemember) save();
	}

	async function logout(): Promise<void> {
		myFetch(`${siteRoute}/${SITE_ROUTES.LOGOUT}`, {}, 'GET', accessToken.value )
			.then(() => {
				accessToken.value = '';
				refreshToken.value = '';
				user.value = null;
				localStorage.removeItem('authData');
			})
			.catch(error => {
				console.log(error);
			})
	}

	function save(): void {
		console.log('Save to Storage');
		localStorage.setItem('authData', JSON.stringify({
			accessToken: accessToken.value,
			refreshToken: refreshToken.value,
			user: user.value,
		}));
	}

	async function load(): Promise<void> {
		const storedData = localStorage.getItem('authData');
		if (storedData) {
			try {
				const data: AuthData = JSON.parse(storedData) as AuthData;
				accessToken.value = data.accessToken;
				refreshToken.value = data.refreshToken;
				user.value = data.user;
				isNeedRemember = true;
				await check();
			} catch ( error ) {
				console.log(error);
			}
		}
	}

	async function check(): Promise<void> {
		myFetch('auth/check', undefined, 'GET', accessToken.value)
			.then((res) => {
				const result: TAuthResponse  = res.response.value as TAuthResponse;
				if (result?.statusCode === 401) {
					refresh();
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	return { accessToken, refreshToken, user, login, register, load, logout };
});
