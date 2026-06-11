# CODEBASE ARCHITECTURE 

### 🔄 Advanced CI/CD & Agent Workflow
- **Multi-Agent Dev:** Sử dụng cô lập môi trường thông qua `Git Worktrees` `(.git/worktrees)`. Không Agent nào được sửa code chung trên branch `main` khi đang chạy song song.
- **UI Verification Rules:** `src/components/` & `src/pages/` -> Thay đổi bắt buộc yêu cầu bằng chứng (Evidence) Screenshot từ Localhost qua Visual QA Loop.
- **Skill Evolution:** Hệ thống có khả năng tự tiến hóa. Bất kỳ quy trình thủ công nào lặp lại >2 lần sẽ được đóng gói bằng lệnh `/create-skill` thành Native Skill trong `.agent/skills/`.
