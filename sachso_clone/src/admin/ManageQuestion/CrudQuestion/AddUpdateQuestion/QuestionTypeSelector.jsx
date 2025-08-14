import { useEffect, useState } from "react";
import { getQuestionTypeApi } from "../../../../util/question/dropdown";
import { Form, Select } from "antd";

function QuestionTypeSelector() {
  const [questionTypeOptions, setQuestionTypeOptions] = useState([]);
  const [selectedQuestionType, setSelectedQuestionType] = useState(null); // lưu id đã chọn

  useEffect(() => {
    const loadQuestionType = async () => {
      const questionTypes = await getQuestionTypeApi();
      const mappedQuestionTypes = questionTypes.map(q => ({
        value: q._id,
        label: q.name,
      }));
      setQuestionTypeOptions(mappedQuestionTypes);
    };
    loadQuestionType();
  }, []);

  return (
    <Form.Item
      label={<span className="rounded-t-lg bg-blue-500 uppercase text-white py-2 px-2">Dạng câu hỏi</span>}
      name="questionTypeId"
      rules={[{message: "Vui lòng chọn dạng câu hỏi!" }]}
    >
      <Select
        placeholder="Chọn dạng câu hỏi"
        options={questionTypeOptions}
        value={selectedQuestionType}
        onChange={(value) => setSelectedQuestionType(value)}
      />
    </Form.Item>
  );
}

export default QuestionTypeSelector;
