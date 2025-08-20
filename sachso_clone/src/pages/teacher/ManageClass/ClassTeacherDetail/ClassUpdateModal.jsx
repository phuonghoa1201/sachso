import { Form, Input, Modal, Button, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import GradeSelector from "../CreateClass/GradeSelector";
import { editClassApi } from "../../../../util/teacher/teacherApi";

function ClassUpdateModal({ open, onCancel, onUpdate, classData }) {
    const [form] = useForm();

    useEffect(() => {
        if (classData) {
            form.setFieldsValue({
                gradeId: classData.gradeId,     
                nameofClass: classData.nameofClass,
                noteClass: classData.noteClass,   
            });
        }
    }, [classData, form]);

    // ClassUpdateModal.jsx
    const handleClick = async () => {
        try {

            const res = await editClassApi(classData._id, form.getFieldsValue());
            console.log("Api res update class", res);
            
            if (res?.EC === 0) {
                alert("Cập nhật lớp thành công");
                // Trả về document mới
                onUpdate(res.DT); 
                onCancel(); 
            } else {
                alert(res?.EM || "Cập nhật thất bại");
            }
        } catch (error) {
            console.error("Lỗi khi update:", error);
            alert("Có lỗi xảy ra khi cập nhật lớp học");
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            title="CẬP NHẬT THÔNG TIN LỚP HỌC"
            footer={null}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="gradeId" label="Khối lớp">
                    <GradeSelector />
                </Form.Item>
                <Form.Item name="nameofClass" label="Tên lớp">
                    <Input placeholder="Nhập tên lớp" />
                </Form.Item>
                <Form.Item name="noteClass" label="Ghi chú">
                    <Input placeholder="Ghi chú thêm (nếu có)" />
                </Form.Item>

                <div className="flex justify-end gap-2 mt-4">
                    <Button onClick={onCancel}>Đóng</Button>
                    <Button type="primary" onClick={handleClick}>
                        Cập nhật
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}

export default ClassUpdateModal;
