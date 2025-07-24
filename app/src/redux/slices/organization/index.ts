// import { AppDispatch } from "@src/redux/store";
// import { createSlice } from "@reduxjs/toolkit";
// import { OrganizationInterface, SuccessMessageInterface, KeyPairInterface } from "@src/redux/interfaces";
// import { organizationApi } from "@src/apis/organizationApis";
// import flashMessage from "@src/components/FlashMessage";

// interface OrganizationState {
//     currentOrganization?: OrganizationInterface;
//     organizations: OrganizationInterface[];
//     nodes: any[]; // Adjust the type according to your node data structure
// }

// const initialState: OrganizationState = {
//     currentOrganization: undefined,
//     organizations: [],
//     nodes: [],
// };

// const organizationSlice = createSlice({
//     name: "organization",
//     initialState,
//     reducers: {
//         setCurrentOrganization: (state, action) => {
//             state.currentOrganization = action.payload;
//         },
//         clearCurrentOrganization: (state) => {
//             state.currentOrganization = undefined;
//         },
//         setOrganizations: (state, action) => {
//             state.organizations = action.payload;
//         },
//         addOrganization: (state, action) => {
//             state.organizations.push(action.payload);
//         },
//         updateOrganization: (state, action) => {
//             const index = state.organizations.findIndex(org => org.id === action.payload.id);
//             if (index !== -1) {
//                 state.organizations[index] = action.payload;
//             }
//         },
//         removeOrganization: (state, action) => {
//             state.organizations = state.organizations.filter(org => org.id !== action.payload);
//         },
//         setOrganizationNodes: (state, action) => {
//             state.nodes = action.payload;
//         },
//         clearOrganizationState: (state) => {
//             state = { ...initialState };
//             return state;
//         },
//     },
// });

// // Export actions
// const {
//     setCurrentOrganization,
//     clearCurrentOrganization,
//     setOrganizations,
//     addOrganization,
//     updateOrganization,
//     removeOrganization,
//     setOrganizationNodes,
//     clearOrganizationState
// } = organizationSlice.actions;

// export {
//     setCurrentOrganization,
//     clearCurrentOrganization,
//     clearOrganizationState
// };

// // ------------------------------- Organization API Functions -------------------------------

// /**
//  * Fetches all organizations
//  * @param callback - An optional callback function
//  */
// export const fetchOrganizations =
//     (callback?: (res: SuccessMessageInterface) => void) =>
//         async (dispatch: AppDispatch) => {
//             const { success, ...response } = await organizationApi.fetchOrganizations();
//             if (success) {
//                 dispatch(setOrganizations(response.data.organizations));
//                 dispatch(setOrganizationNodes(response.data.nodes || []));
//             }
//             flashMessage(response.message, success ? "success" : "error");
//             callback && callback({ success, message: response.message });
//         };

// /**
//  * Creates a new organization
//  * @param data - Organization data
//  * @param callback - An optional callback function
//  */
// export const createOrganization =
//     (data: KeyPairInterface, callback?: (res: SuccessMessageInterface) => void) =>
//         async (dispatch: AppDispatch) => {
//             const { success, ...response } = await organizationApi.createOrganization(data);
//             if (success) {
//                 dispatch(addOrganization(response.data));
//             }
//             flashMessage(response.message, success ? "success" : "error");
//             callback && callback({ success, message: response.message });
//         };

// /**
//  * Updates an organization
//  * @param id - Organization ID
//  * @param data - Updated data
//  * @param callback - An optional callback function
//  */
// export const updateOrganizationById =
//     (id: string, data: KeyPairInterface, callback?: (res: SuccessMessageInterface) => void) =>
//         async (dispatch: AppDispatch) => {
//             const { success, ...response } = await organizationApi.updateOrganization(id, data);
//             if (success) {
//                 dispatch(updateOrganization(response.data));
//             }
//             flashMessage(response.message, success ? "success" : "error");
//             callback && callback({ success, message: response.message });
//         };

// /**
//  * Deletes an organization
//  * @param id - Organization ID
//  * @param callback - An optional callback function
//  */
// export const deleteOrganization =
//     (id: string, callback?: (res: SuccessMessageInterface) => void) =>
//         async (dispatch: AppDispatch) => {
//             const { success, ...response } = await organizationApi.deleteOrganization(id);
//             if (success) {
//                 dispatch(removeOrganization(id));
//             }
//             flashMessage(response.message, success ? "success" : "error");
//             callback && callback({ success, message: response.message });
//         };

// /**
//  * Fetches organization details
//  * @param id - Organization ID
//  * @param callback - An optional callback function
//  */
// export const fetchOrganizationDetails =
//     (id: string, callback?: (res: SuccessMessageInterface) => void) =>
//         async (dispatch: AppDispatch) => {
//             const { success, ...response } = await organizationApi.getOrganizationDetails(id);
//             if (success) {
//                 dispatch(setCurrentOrganization(response.data));
//             }
//             flashMessage(response.message, success ? "success" : "error");
//             callback && callback({ success, message: response.message });
//         };

// export default organizationSlice.reducer;
