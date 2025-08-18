import { useEffect, useState } from "react";
import { getUnitApi, getGradeAPI } from "../../../../util/question/dropdown";
import { Form, Select } from "antd";

function UnitGradeSelector({ form, editingQuestion }) {
  const [selectedGradeId, setSelectedGradeId] = useState(null);
  const [unitOptions, setUnitOptions] = useState([]);
  const [gradeOptions, setGradeOptions] = useState([]);

  // Khi edit, set selectedGradeId và form field
  useEffect(() => {
    if (editingQuestion) {
      const gradeId = editingQuestion.gradeId?._id || editingQuestion.gradeId;
      const unitId = editingQuestion.unitId?._id || editingQuestion.unitId;
      if (gradeId) setSelectedGradeId(gradeId);
      form.setFieldsValue({ gradeId, unitId });
    }
  }, [editingQuestion, form]);

  // Load grade options lúc mount
  useEffect(() => {
    const loadGrades = async () => {
      try {
        const grades = await getGradeAPI();
        const mappedGrades = grades.map((g) => ({
          value: g._id,
          label: g.name,
        }));
        setGradeOptions(mappedGrades);
      } catch (error) {
        console.error("Lỗi load grades:", error);
      }
    };
    loadGrades();
  }, []);

  // Load unit options khi gradeId thay đổi
  useEffect(() => {
    const loadUnits = async () => {
      try {
        const units = await getUnitApi();
        const filteredUnits = units.filter((u) => u.gradeId._id === selectedGradeId);
        const mappedUnits = filteredUnits.map((u) => ({
          value: u._id,
          label: u.name,
        }));
        setUnitOptions([...mappedUnits, { value: "all", label: "Tất cả" }]);

        // Nếu đang edit, set lại unitId từ editingQuestion
        if (editingQuestion && editingQuestion.unitId) {
          const unitId = editingQuestion.unitId._id || editingQuestion.unitId;
          form.setFieldsValue({ unitId });
        } else {
          // Nếu unit hiện tại không hợp lệ, reset
          const unitId = form.getFieldValue("unitId");
          if (!filteredUnits.some(u => u._id === unitId)) {
            form.setFieldsValue({ unitId: undefined });
          }
        }
      } catch (error) {
        console.error("Lỗi load units:", error);
        setUnitOptions([]);
      }
    };

    if (selectedGradeId) {
      loadUnits();
    } else {
      setUnitOptions([]);
      form.setFieldsValue({ unitId: undefined });
    }
  }, [selectedGradeId, form, editingQuestion]);


  return (
    <div>
      <Form.Item
        label={<span className="rounded-t-lg bg-blue-500 uppercase text-white py-2 px-2">Khối lớp</span>}
        name="gradeId"
        rules={[{ message: "Vui lòng chọn khối lớp!" }]}
      >
        <Select
          placeholder="Chọn khối"
          options={gradeOptions}
          onChange={(value) => setSelectedGradeId(value)}
          allowClear
        />
      </Form.Item>

      <Form.Item
        label={<span className="rounded-t-lg bg-blue-500 uppercase text-white py-2 px-2">Unit</span>}
        name="unitId"
        rules={[{ message: "Vui lòng chọn unit!" }]}
      >
        <Select placeholder="Chọn Unit" options={unitOptions} allowClear />
      </Form.Item>
    </div>
  );
}

export default UnitGradeSelector;
