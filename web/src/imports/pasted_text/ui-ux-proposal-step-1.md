Dưới đây là chi tiết đề xuất UI/UX cho **Step 1: Setup** dựa trên cấu trúc mới của bạn. Hướng đi này rất xuất sắc vì nó gom toàn bộ "Brand DNA" vào một màn hình duy nhất, giúp user (đặc biệt là các C-level hoặc Founder) có thể phác thảo nhanh toàn bộ bức tranh chiến lược ngay từ đầu. 

Vì rất nhiều trường ở phần (b) là "Nice to have", UI nên được thiết kế theo dạng **Progressive Disclosure (Mở rộng dần)**: Nghĩa là hiển thị các Must-have trước, và giấu các Nice-to-have trong các Accordion (menu thả) hoặc nút "Advanced/Deep-dive" để không làm dội UX của những user chỉ muốn setup nhanh.

---

### a/ Basic Identity
Khu vực này được thiết kế như một **Header Card** cố định ở trên cùng màn hình.

*   **Name:** Text input cỡ lớn (Heading 1), focus sẵn con trỏ chuột khi vừa tạo project.
*   **Category:** Searchable Dropdown (Gõ phím để tìm kiếm ngành hàng/ngách).
*   **Geography:** Multi-select input. User chọn đến đâu sẽ tạo thành các Tag đến đó (vd: US, Vietnam, APAC).

---

### b/ Current situation

Đây là vùng Canvas chính của Step 1. Chúng ta sẽ chia thành các Widget/Block rõ ràng.

#### 1. Core strength (Must have)
*   **UI Design:** Thiết kế một **4-way Axis (Radar chart hình chữ thập)**. 4 đầu mũi tên tương ứng với 4 lựa chọn Core strength: *Product, Story, Experience, Price*. 
*   **UX Interaction:** 
    *   Trên mỗi trục mũi tên có 3 nấc (Snap points): *Low, Medium, Highly Competitive*.
    *   User nắm một điểm node (chấm tròn) kéo trượt trên mỗi trục mũi tên.
    *   **Luật ép buộc (Forced Choice - theo sách):** Hệ thống chỉ cho phép **duy nhất 1 trục** được kéo lên mức *Highly Competitive*, 2 trục ở mức *Medium*, và 1 trục phải nằm ở mức *Low*. Nếu user cố kéo trục thứ 2 lên Highly Competitive, trục kia sẽ tự động thụt xuống.
    *   Khi 1 trục được chốt ở mức *Highly Competitive*, một khung **Text Area (Mô tả chi tiết)** sẽ tự động trượt ra (slide down) ngay bên dưới trục đó với placeholder: *"Explain why your [Product/Story/...] is highly competitive..."* để user gõ giải thích chi tiết.

#### 2. Key competitors (Must have & Nice to have)
*   **UI - Must have (List):** 3 dòng Text Input để gõ tên các Direct Competitors. Gõ xong tên nào, tên đó sẽ biến thành một "Draggable Chip" (Thẻ có thể kéo thả).
*   **UI - Nice to have (Competitor Mapping):** Một nút toggle *"Show Perceptual Map"*. Bấm vào sẽ hiện ra một đồ thị **2x2 Matrix**.
    *   **Trục X và Y:** Có 2 Dropdown menu ở 2 đầu trục để user tự chọn yếu tố phân khúc (ví dụ chọn X là Price, Y là Quality/Durability/User-friendly).
    *   **Tương tác (Drag & drop):** User dùng chuột kéo các "Competitor Chips" (đã gõ ở trên) và cả "Brand Chip" (chính brand của user) thả vào các góc phần tư của bản đồ để trực quan hóa vị trí tương quan.

#### 3. Competitive position (Must have)
*   **UI Design:** Lưới 2x2 gồm 4 **Interactive Cards**: *Power Player, Challenger, Disruptor, Craft*.
*   **UX Interaction:** Radio-card behavior. Bấm chọn 1 card, các card khác mờ đi. Mỗi card có một icon đặc trưng và mô tả ngắn khi hover chuột vào.

#### 4. Target customer
*   **Gợi ý Format Segmentation (Dựa trên tài liệu):** Bạn có thể chia segmentation thành 3 nhóm: 
    *   *Consumer profiling:* Demographics (Tuổi, thu nhập), Geography.
    *   *Consumer behavior:* Need states, Purchase occasion.
    *   *Consumer psychographics:* Lifestyle, Values.
*   **UI Design:** Cung cấp một bảng **Target Builder** dạng các cột (Columns). Nút *"Add Segment"* cho phép tạo ra nhiều tệp khách hàng khác nhau.
*   **UX - Chọn Focus Target:** Ở mỗi Segment được tạo ra, có một nút Checkbox lớn báo hiệu: **"Set as Focus Target"**. User bắt buộc phải tick chọn 1 tệp duy nhất để làm kim chỉ nam cho toàn bộ plan phía sau. Khi tick, các tệp khác sẽ thu gọn lại.

---

### c/ Advanced Strategic DNA (Nice to have)

Vì từ mục Insights đến Brand Vision đều là những yếu tố cấu thành định vị cốt lõi, bạn nên gom chúng vào một Block có tên **"Advanced Strategic DNA"**. Mặc định block này có thể thu gọn, ai muốn draft nhanh chiến lược thì bấm mở ra.

*   **Insights:** 
    *   *UI:* Text area. 
    *   *UX:* Khóa cứng chữ **"I..."** (hoặc dấu ngoặc kép) ở đầu ô nhập liệu để ép user viết dưới góc nhìn ngôi thứ nhất của Consumer.
*   **Consumer benefits:** 
    *   *UI:* 2 dòng Input dạng Add Tags (Một dòng cho Functional, một dòng cho Emotional). Hệ thống có thể suggest các từ khóa khi user gõ (vd: gõ "Sa" -> gợi ý *Saves time, Safe*).
*   **Values, belief, inspirations:** 
    *   *UI:* 3 ô Text input ngắn xếp chồng lên nhau. 
*   **RTBs (Reasons to Believe):** 
    *   *UI:* Tối đa 2 dòng bullet points. Bên cạnh mỗi dòng có một Dropdown nhỏ chọn loại RTB (vd: *Process, Product claims, Third-person endorsement, Behavioral results*).
*   **Discriminator:** 
    *   *UI:* Một ô text ngắn với helper text: *"What is the single most compelling reason to choose you over competitors?"*
*   **Brand Idea and brand essence:** 
    *   *UI:* Ô Text input cỡ chữ to (Hero text), nhấn mạnh việc giới hạn độ dài. Helper text: *"Your 7-second pitch"*.
*   **Positioning:** 
    *   *UI/UX:* Thay vì bắt user gõ lại từ đầu, hệ thống có thể dùng một form **Mad-libs (Điền vào chỗ trống)** kéo data đã gõ ở trên xuống: 
        *"To [Target customer], [Name] is the [Category] that delivers [Consumer benefits]. That's because [RTBs]."* 
        User có thể đọc đoạn preview này và edit lại cho mượt mà.
*   **Brand vision:** 
    *   *UI:* Text Area. Helper text: *"Where could we be in 5-10 years? Write a goal that scares you a little and excites you a lot."*

### Tóm tắt luồng chảy (Flow) của Step 1:
Với layout này, Step 1 không còn là những ô nhập liệu nhàm chán mà trở thành một **Interactive Dashboard**. User bắt đầu bằng việc xác định thân phận (Identity), sau đó chơi game kéo thả mũi tên (Core strength) và bản đồ (Key competitors) để đánh giá vị thế, chốt tệp khách hàng (Target customer), và cuối cùng là điền các "hạt giống" (Nice to have) của chiến lược để làm nguyên liệu tự động đổ (auto-fill) sang các Step 3, 4, 5 sau này.