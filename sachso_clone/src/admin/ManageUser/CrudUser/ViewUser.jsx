import { Modal, Descriptions } from "antd";

function ViewUser({ openViewUser, closeViewUser, userData }) {
    return (
        <Modal
            title="Xem Người dùng"
            centered
            open={openViewUser}
            onCancel={closeViewUser}
            footer={null}
        >
            <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="Tên">
                    {userData?.name || "Chưa có tên"}
                </Descriptions.Item>
                <Descriptions.Item label="Loại tài khoản">
                    {userData?.role || "Chưa có loại tài khoản"}
                </Descriptions.Item>
                <Descriptions.Item label="Cấp">
                    {userData?.level || "Chưa có cấp"}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                    {userData?.email || "Chưa có email"}
                </Descriptions.Item>
                <Descriptions.Item label="Điện thoại">
                    {userData?.phone || "Chưa có điện thoại"}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày tạo">
                    {userData?.date ? new Date(userData.date).toLocaleString() : "Không rõ"}
                </Descriptions.Item>
            </Descriptions>
        </Modal>
    );
}

export default ViewUser;
