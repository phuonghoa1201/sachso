import { useEffect, useState } from "react";
import { Form, Select } from "antd";
import { getGradeAPI } from "../../../../util/question/dropdown";

function GradeSelector() {
  const [gradeOptions, setGradeOptions] = useState([]);

  useEffect(() => {
    const loadGrades = async () => {
      try {
        const grades = await getGradeAPI(); 
        console.log("API response:", grades); 
        if (Array.isArray(grades)) {
          const mappedGrades = grades.map((g) => ({
            value: g._id,
            label: g.name,
          }));
          setGradeOptions(mappedGrades);
        } else {
          console.error("Dữ liệu trả về không hợp lệ:", grades);
        }
      } catch (error) {
        console.error("Lỗi load grades:", error);
      }
    };

    loadGrades();
  }, []);

  return (
    <Form.Item
      label="Khối lớp"
      name="gradeId"
      rules={[{ message: "Vui lòng chọn khối lớp!" }]}
    >
      <Select
        placeholder="Chọn khối lớp"
        options={gradeOptions}
        showSearch
        allowClear
        filterOption={(input, option) =>
          option.label.toLowerCase().includes(input.toLowerCase())
        }
      />
    </Form.Item>
  );
}

export default GradeSelector;
