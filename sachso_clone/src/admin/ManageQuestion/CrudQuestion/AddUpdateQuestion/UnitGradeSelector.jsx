import { useEffect, useState } from "react";
import { getUnitApi, getGradeAPI } from "../../../../util/question/dropdown";
import { Form, Select } from "antd";

function UnitGradeSelector({ form }) {
  const [selectedGradeId, setSelectedGradeId] = useState(null);
  const [unitOptions, setUnitOptions] = useState([]);
  const [gradeOptions, setGradeOptions] = useState([]);

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
        // Lọc unit theo gradeId được chọn
        const filteredUnits = units.filter((u) => u.gradeId._id === selectedGradeId);
        const mappedUnits = filteredUnits.map((u) => ({
          value: u._id,
          label: u.name,
        }));
        setUnitOptions([...mappedUnits, { value: "all", label: "Tất cả" }]);

        // Reset unitId trong form khi đổi grade
        form.setFieldsValue({ unitId: undefined });
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
  }, [selectedGradeId, form]);

  return (
    <div>
      <Form.Item
        label={
          <span className="rounded-t-lg bg-blue-500 uppercase text-white py-2 px-2">
            Khối lớp
          </span>
        }
        name="gradeId"
        rules={[{ required: true, message: "Vui lòng chọn khối lớp!" }]}
      >
        <Select
          placeholder="Chọn khối"
          options={gradeOptions}
          onChange={(value) => setSelectedGradeId(value)}
          allowClear
        />
      </Form.Item>

      <Form.Item
        label={
          <span className="rounded-t-lg bg-blue-500 uppercase text-white py-2 px-2">
            Unit
          </span>
        }
        name="unitId"
        rules={[{ required: true, message: "Vui lòng chọn unit!" }]}
      >
        <Select placeholder="Chọn Unit" options={unitOptions} allowClear />
      </Form.Item>
    </div>
  );
}

export default UnitGradeSelector;
