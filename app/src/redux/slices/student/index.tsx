// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import authApis from '@src/apis/authApis';
// import { SuccessMessageInterface } from '@src/redux/interfaces';
// import { AppDispatch } from '@src/redux/store';

// interface StudentState {
//     detail: Record<string, any> | null;
//     isAuthenticated: boolean;
// }

// const initialState: StudentState = {
//     detail: null,
//     isAuthenticated: false,
// };

// const studentSlice = createSlice({
//     name: 'student',
//     initialState,
//     reducers: {
//         setStudentDetail: (state, action: PayloadAction<Record<string, any>>) => {
//             state.detail = action.payload;
//             state.isAuthenticated = true;
//         },
//         logoutStudent: (state) => {
//             state.detail = null;
//             state.isAuthenticated = false;
//         },
//     },
// });

// export const { setStudentDetail, logoutStudent } = studentSlice.actions;
// export default studentSlice.reducer;

// // Thunk Action: Login Student
// export const loginStudent =
//     (data: Record<string, unknown>, callback?: (res: SuccessMessageInterface) => void) =>
//         async (dispatch: AppDispatch) => {
//             const { success, ...response } = await authApis.LoginApi(data);
//             if (success) {
//                 await dispatch(setStudentDetail(response.data));
//             }
//             flashMessage(response.message, success ? 'success' : 'error');
//             callback?.({ success, message: response.message });
//         };
