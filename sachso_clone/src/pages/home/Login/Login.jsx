import { jwtDecode } from "jwt-decode";
import { Modal, Button, Form, Input } from "antd";
import modalImg from '../../../assets/modalImg.png';
import styles from './Login.module.css';
import { useContext, useEffect, useState } from "react";
import { notification } from "antd";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../../util/api";
import { AuthContext } from "../../../components/context/auth.context";
function Login({ open, onClose, onLoginSuccess, prefillEmail }) {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({email:prefillEmail})
    }, [prefillEmail, form])

    const { setAuth } = useContext(AuthContext)
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        const { email, password } = values;

        try {


            const res = await loginApi(email, password);
            // debugger

            if (res && res.EC === 0) {
                localStorage.setItem("access_token", res.access_token)
                // const userRole = res.user?.role || "guest";
                // localStorage.setItem("userRole", userRole);

                // Decode token để lấy role từ payload
                const decoded = jwtDecode(res.access_token);
                const userRole = decoded.role || "guest";
                console.log("role", userRole);



                alert("Đăng nhập thành công");
                // notification.success({
                //     message: "Đăng nhập thành công",
                //     description: `Xin chào ${res.user?.name || "bạn"}!`,
                //     duration: 2,
                // });

                setAuth({
                    isAuthenticated: true,
                    user: {
                        email: res?.user?.email ?? "",
                        name: res?.user?.name ?? ""
                    },

                })
                form.resetFields();
                onClose();

                setTimeout(() => {

                    onLoginSuccess();


                    switch (userRole) {
                        case "admin":
                            navigate("/admin");
                            break;
                        case "teacher":
                            navigate("/teacher");
                            break;
                        case "student":
                            navigate("/student");
                            break;
                        default:
                            navigate("/unauthorized");
                    }

                }, 2000);
                

            } else {
                alert(res?.EM ?? "Lỗi đăng nhập");
                // notification.error({
                //     message: "Đăng nhập thất bại",
                //     description: res?.EM ?? "Thông tin không hợp lệ",
                //     duration: 2,
                // });
            }
        } catch (error) {
            console.error(error);
            notification.error({
                message: "Lỗi hệ thống",
                description: "Vui lòng thử lại sau ít phút!",
                duration: 3,
            });
        } finally {
            setLoading(false);
        }
    };


    // Xu ly modal quen mat khau
    const [openForgotModal, setOpenForgotModal] = useState(false);

    // Open Fg Modal
    const handleOpenForgotModel = () => setOpenForgotModal(true);
    // Close Fg Modal
    const handleCloseForgotModal = () => setOpenForgotModal(false);

    return (
        <div>
            <Modal
                title="ĐĂNG NHẬP"
                centered
                open={open}
                onCancel={onClose}
                footer={null}
                className={styles.modalBody}
            >
                <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 h-full">
                    <div className="w-full md:w-1/2">
                        <Form form={form} layout="vertical" onFinish={onFinish}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                            >
                                <Input type="email" />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                            >
                                <Input.Password />


                            </Form.Item>
                            <button type="button" className="text-blue-700 py-4" onClick={handleOpenForgotModel} >
                                Quên mật khẩu ?
                            </button>

                            <Form.Item>
                                <Button
                                    className="w-full"
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    ĐĂNG NHẬP
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="w-full md:w-1/2 hidden md:block">
                        <img className="w-full h-full" src={modalImg} alt="Login visual" />
                    </div>
                </div>
            </Modal>
            <ForgotPassword openForgot={openForgotModal} onCloseForgot={handleCloseForgotModal} />
        </div>
    );
}

export default Login;
