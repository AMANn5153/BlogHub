import useAuthFetch from "../../utils/authFetch";
import { useState } from "react";
import { toast } from "react-toastify";

const useUpdatePassword = () => {
    const { authFetch } = useAuthFetch();
    const [loadingState, setLoadingState] = useState(false);
    
    const updatePassword = async ({ currentPassword, newPassword, confirmPassword }) => {
        try {
            if (newPassword !== confirmPassword) {
                throw new Error("New password and confirmation do not match");
            }

            setLoadingState(true);
            const response = await authFetch(
                `${process.env.REACT_APP_API_URL}/setting/updatePassword`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ currentPassword, newPassword }) // confirmPassword not sent
                }
            );

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            toast.success(responseData.message); // Show success message
            return responseData.message;
        } catch (e) {
            console.error(e);
            toast.error(e.message);
        } finally {
            setLoadingState(false);
        }
    };

    return { updatePassword, loadingState };
};

export default useUpdatePassword;