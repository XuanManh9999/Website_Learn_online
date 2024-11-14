// Mỗi lần có request -> gửi về ID người dùng -> Đã active
// Lấy ID query lên khóa học tương ứng dựa vào ID
const courses = {
  status: 200,
  message: "get course succses",
  course: {
    id: "1",
    name_course: "Lập trình C++ từ cơ bản đến nâng cao",
    desc_course:
      "Khóa học lập trình C++ từ cơ bản tới nâng cao dành cho người mới bắt đầu. Mục tiêu của khóa học này nhằm giúp các bạn nắm được các khái niệm căn cơ của lập trình, giúp các bạn có nền tảng vững chắc để chinh phục con đường trở thành một lập trình viên.",
    name_type: "Miễn phí",
    author: "Xuân Mạnh",
    old_price: 2000000,
    price: 1500000,
    imgage_course: "avatar_course",
    icon_course: "icon",
    level_course: "Cơ bản",
    create_at: "11/11/2024",
    update_at: "12/11/2024",
    study_time: "120h",
    cover_photo_course: "cover_photo_course",
    featured_course: 0,
    active: 1,
    chapter: [
      {
        id: "1",
        title_chapter: "1. Giới thiệu khóa học",
        description: "Đây là chương 1",
        active: 1,
        create_at: "11/11/2024",
        update_at: "12/11/2024",
        videos: [
          {
            id: "1",
            order_number: 10,
            featured_video: 0,
            url_video: "new_url_video",
            user_watch: 1,
            active: 1,
          },  
        ],
      },
    ],
  },
};
