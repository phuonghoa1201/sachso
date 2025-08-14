import { PlusOutlined, InsertRowAboveOutlined } from "@ant-design/icons";
import FilterQuestion from "./CrudQuestion/FilterQuestion";
import TableQuestion from "./TableQuestion/TableQuestion";
import AddQuestion from "./CrudQuestion/AddUpdateQuestion/AddUpdateQuestion";
import ViewQuestion from "./CrudQuestion/ViewQuestions";
import { Modal } from "antd";
import { useState, useEffect } from "react";
import { getQuestionApi } from "../../util/api";

function ManageQuestion() {
  const [questions, setQuestions] = useState([]);
  const [filterQuestions, setFilterQuestions] = useState([]);

  // Add / Update modal
  const [openAddQuestionModal, setOpenAddQuestionModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // View modal
  const [openViewModal, setOpenViewModal] = useState(false);
  const [viewQuestions, setViewQuestions] = useState(null);

  // Delete modal
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await getQuestionApi();
        if (res.EC === 0 && Array.isArray(res.DT)) {
          const mapped = res.DT.map((item, idx) => ({
            ...item,
            key: item._id,
            stt: idx + 1,
            class: item.gradeId?.name || '',
            unit: item.unitId?.name || '',
            skills: item.skillId ? [item.skillId.name] : [],
            questionText: item.content,
            types: item.questionTypeId?.name || '',
            levels: item.cognitionLevelId?.name || '',
            answersType: item.answerType || 'text',
          }));
          setQuestions(mapped);
        } else {
          setQuestions([]);
        }
      } catch (err) {
        console.error("Lỗi load câu hỏi:", err);
        setQuestions([]);
      }
    };
    fetchQuestion();
  }, []);

  useEffect(() => {
    setFilterQuestions(questions);
  }, [questions]);

  const handleOpenAddQuestionModal = () => {
    setEditingQuestion(null);
    setOpenAddQuestionModal(true);
  };
  const handleCloseAddQuestionModal = () => {
    setOpenAddQuestionModal(false);
    setEditingQuestion(null);
  };


  const formatQuestionForTable = (q) => ({
    ...q,
    key: q._id,
    stt: questions.length + 1,
    skills: q.skillId ? [q.skillId.name] : [],
    unit: q.unitId?.name || '',
    questionText: q.content,
    types: q.questionTypeId?.name || '',
    levels: q.cognitionLevelId?.name || '',
    answersType: q.answerType || 'text',
  });

  const addQuestion = (newQuestion) => {
    const formatted = formatQuestionForTable(newQuestion);
    setQuestions(prev => [...prev, formatted]);
    handleCloseAddQuestionModal();
  };


  const updateQuestion = (updatedQuestion) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q =>
        q.key === editingQuestion.key
          ? { ...formatQuestionForTable(updatedQuestion), key: q.key, stt: q.stt }
          : q
      )
    );
    setEditingQuestion(null);
    setOpenAddQuestionModal(false);
  };


  const handleOpenUpdateQuestionModal = (question) => {
    setEditingQuestion(question);
    setOpenAddQuestionModal(true);
  };


  const handleViewQuestions = (question) => {
    setViewQuestions(question);
    setOpenViewModal(true);
  };

 
  const handleOpenDeleteModal = (question) => {
    setQuestionToDelete(question);
    setConfirmDeleteVisible(true);
  };
  const handleDeleteQuestion = () => {
    setQuestions(prev => prev.filter(q => q.key !== questionToDelete.key));
    setConfirmDeleteVisible(false);
    setQuestionToDelete(null);
  };


  const handleFilter = (filterValues) => {
    const filtered = questions.filter((q) => {
      return (
        (!filterValues.class || q.class === filterValues.class) &&
        (!filterValues.unit || q.unit.includes(filterValues.unit)) &&
        (!filterValues.skill || q.skills.some(s => s.toLowerCase().includes(filterValues.skill.toLowerCase()))) &&
        (!filterValues.type || q.types === filterValues.type) &&
        (!filterValues.request || q.request === filterValues.request) &&
        (!filterValues.level || q.levels === filterValues.level) &&
        (!filterValues.question || q.questionText.toLowerCase().includes(filterValues.question.toLowerCase()))
      );
    });
    setFilterQuestions(filtered);
  };

  return (
    <div>
      {/* Header */}
      <div className="mx-auto mt-4 bg-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6 border-b border-gray-300 px-4">
          <div className="uppercase text-xl font-medium">Quản lý câu hỏi</div>
          <div className="flex space-x-2 text-sm">
            <button
              className="py-2 bg-blue-500 text-white border rounded border-blue-500 px-2"
              onClick={handleOpenAddQuestionModal}
            >
              <PlusOutlined className="text-white" /> Thêm câu hỏi
            </button>
            <button className="border bg-blue-500 text-white rounded border-blue-500 px-2">
              <InsertRowAboveOutlined /> Nhập từ excel
            </button>
          </div>
        </div>

        {/* Filter */}
        <FilterQuestion onFilter={handleFilter} />

        {/* Table */}
        <TableQuestion
          questions={filterQuestions}
          onUpdate={handleOpenUpdateQuestionModal}
          onView={handleViewQuestions}
          onDelete={handleOpenDeleteModal}
        />
      </div>

      {/* Add / Update Question Modal */}
      <AddQuestion
        openAddQuestion={openAddQuestionModal}
        closeAddQuestion={handleCloseAddQuestionModal}
        addQuestion={addQuestion}
        updateQuestion={updateQuestion}
        editingQuestion={editingQuestion}
      />

      {/* View Question Modal */}
      <ViewQuestion
        openViewQuestion={!!viewQuestions}
        closeViewQuestion={() => setViewQuestions(null)}
        questionData={viewQuestions}
      />

      {/* Delete Confirm Modal */}
      <Modal
        title="Xác nhận xoá"
        open={confirmDeleteVisible}
        onOk={handleDeleteQuestion}
        onCancel={() => setConfirmDeleteVisible(false)}
        okText="Xoá"
        cancelText="Hủy"
        okType="danger"
      >
        <p>Bạn có chắc chắn muốn xoá question "<strong>{questionToDelete?.questionText}</strong>" không?</p>
      </Modal>
    </div>
  );
}

export default ManageQuestion;
