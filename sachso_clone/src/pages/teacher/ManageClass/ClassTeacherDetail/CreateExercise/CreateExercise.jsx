import { Button, message } from "antd";
import { useState } from "react";
import ExerciseModal from "./ExerciseModal";
import { addExerciseApi } from "../../../../../util/teacher/teacherApi";

function CreateExercise({ classId }) {
  const [openModal, setOpenModal] = useState(false);

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleSave = async (values) => {
    try {
      // Gọi API backend tạo Exercise
      const res = await addExerciseApi();

      console.log("Response từ backend:", res.data);
      message.success("Tạo bài tập thành công!");
      setOpenModal(false);
    } catch (err) {
      console.error("Lỗi tạo bài tập:", err.response?.data || err.message);
      message.error("Có lỗi xảy ra khi tạo bài tập");
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setOpenModal(true)}>
        Tạo mới bài tập
      </Button>

      <ExerciseModal
        open={openModal}
        onCancel={handleCancel}
        onClick={handleSave} // callback nhận dữ liệu từ modal
        classId={classId}
      />
    </div>
  );
}

export default CreateExercise;
