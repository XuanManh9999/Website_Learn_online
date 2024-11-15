// Mỗi lần có request -> gửi về ID người dùng -> Đã active
// Lấy ID query lên khóa học tương ứng dựa vào ID
const nguyen_ly_he_dieu_hanh = {
  id: 1,
  name: "Nguyên Lý Hệ Điều Hành Từ Cơ Bản Đến Nâng Cao",
  image: "https://i.ytimg.com/vi/jGkk018fFM4/sddefault.jpg",
  coverPhoto: "https://example.com/images/java-cover.jpg",
  price: 0,
  prevPrice: 0,
  description:
    "Hiểu được khó khăn của các bạn sinh viên ngành Công Nghệ Thông Tin trong việc hiểu và vận dụng kiến thức môn nguyên lý hệ điều hành trong thực tế. Mình có quay một số video để gửi tới các bạn hy vọng khóa học sẽ giúp các bạn hiểu hơn về môn học, và thêm yêu và tin tưởng ngành Công Nghệ Thông Tin sẽ là tương lai của mình.",
  level: "Cơ bản",
  author: "Xuân Mạnh",
  author_img:
    "https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/347548956_267208655696795_9021677410419025373_n.jpg?stp=dst-jpg_s200x200&_nc_cat=100&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeF_9lafOGNTrtWDe-WS5dX7_wS9na-lXjX_BL2dr6VeNYvURsdGKooinZx_FmCVld3fSoDZpKRseVgFykj6KYlA&_nc_ohc=FdSkFnC2MF0Q7kNvgEhBDIa&_nc_zt=24&_nc_ht=scontent.fhan17-1.fna&_nc_gid=A-lJkQBbpf1R1w-2KMmwb9k&oh=00_AYBZiPo0lzG7AY5FrU_waiLi5Jarwgw3CwmzeJWrgotT0g&oe=673AA2D4",
  icon: "https://example.com/icons/java-icon.png",
  slug: "nguyen-ly-he-dieu-hanh",
  chapterList: [
    {
      title: "Một số thuật toán nguyên lý hệ điều hành thường gặp",
      description:
        "Đây là một số thuật toán nguyên lý hệ điều hành cơ bản, nhưng nó thường được áp dụng rộng rãi ở các kiến trúc phức tạp, vì vậy việc nắm bắt nó là bắt buộc trước khi muốn đi sâu, và giải quyết các bài toán phức tạp sau này.",
      videos: [
        {
          urlVideo: "Q4rnEccARbY",
          docMore: "https://example.com/docs/java-intro.pdf",
          preOrder: 1,
        },
        {
          urlVideo: "XQ8JqtGyhgI",
          docMore: "https://example.com/docs/streams-lambdas.pdf",
        },
        {
          urlVideo: "_fioaHTU_24",
          docMore: "https://example.com/docs/streams-lambdas.pdf",
        },
        {
          urlVideo: "hdERw6tSnig",
          docMore: "https://example.com/docs/streams-lambdas.pdf",
        },
        {
          urlVideo: "Jhob1rpbIxg",
          docMore: "https://example.com/docs/streams-lambdas.pdf",
        },
      ],
    },
    {
      title: "Các chiến lược cấp phát bộ nhớ trong máy tính",
      description:
        "Sau khi hiểu về các thuật toán cơ bản trong lập lịch, giờ đã đến lúc chúng ta học sâu hơn về các hệ thống máy tính, cách mà nó cấp phát bộ nhớ như thế nào sẽ được mình chia sẻ ở chương học này.",
      videos: [
        {
          urlVideo: "xo7W5itpzMg",
          docMore: "https://example.com/docs/java-intro.pdf",
        },
        {
          urlVideo: "1GvP8NPJD6g",
          docMore: "https://example.com/docs/streams-lambdas.pdf",
        },
        {
          urlVideo: "KW7tsKtFC1s",
          docMore: "https://example.com/docs/streams-lambdas.pdf",
        },
        {
          urlVideo: "kPOuW-55E8k",
          docMore: "https://example.com/docs/streams-lambdas.pdf",
        },
        {
          urlVideo: "1TSqsbLEq9s",
          docMore: "https://example.com/docs/streams-lambdas.pdf",
        },
      ],
    },
    {
      title: "Các giải thuật trong hệ thống máy tính",
      description:
        "Các máy tính nhìn rất phức tạp nhưng bên trong nó chứa đựng chi thức của nhân loại, chương này sẽ giúp bạn hiểu hơn về các giải thuật mà máy tính hay làm, chúng ta hãy xem thực sự máy tính nó dùng nó như nào nhé.",
      videos: [
        {
          urlVideo: "ZDKD-C3mp_k",
          docMore: "https://example.com/docs/java-intro.pdf",
        },
        {
          urlVideo: "xrw-notY6IM",
          docMore: "https://example.com/docs/streams-lambdas.pdf",
        },
      ],
    },
    {
      title: "Các thuật toán thay thế trang",
      description:
        "Trong chương này chúng ta sẽ tìm hiểu về các thuật toán máy tính dùng để thay thế trang, hãy cùng mình tìm hiểu nó nhé.",
      videos: [
        {
          urlVideo: "uO8NX1xG5yI",
          docMore: "https://example.com/docs/java-intro.pdf",
        },
        {
          urlVideo: "jGkk018fFM4",
          docMore: "https://example.com/docs/streams-lambdas.pdf",
        },
        {
          urlVideo: "eQrDqEM6hKg",
          docMore: "https://example.com/docs/streams-lambdas.pdf",
        },
      ],
    },
  ],
};

const lofi_chill = {
  name: "Những video nên nghe để làm việc tốt hơn",
  image: "https://i.ytimg.com/vi/c7jZkwv-DX4/sddefault.jpg",
  coverPhoto: "https://example.com/images/java-cover.jpg",
  price: 0,
  prevPrice: 0,
  description:
    "Đây là một số video mình thường nghe khi làm việc, nó giúp mình thỏa mái và tập trung hơn hy vọng bạn cũng thấy vậy.",
  level: "Cơ bản",
  author: "Xuân Mạnh",
  author_img:
    "https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/347548956_267208655696795_9021677410419025373_n.jpg?stp=dst-jpg_s200x200&_nc_cat=100&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeF_9lafOGNTrtWDe-WS5dX7_wS9na-lXjX_BL2dr6VeNYvURsdGKooinZx_FmCVld3fSoDZpKRseVgFykj6KYlA&_nc_ohc=FdSkFnC2MF0Q7kNvgEhBDIa&_nc_zt=24&_nc_ht=scontent.fhan17-1.fna&_nc_gid=A-lJkQBbpf1R1w-2KMmwb9k&oh=00_AYBZiPo0lzG7AY5FrU_waiLi5Jarwgw3CwmzeJWrgotT0g&oe=673AA2D4",
  icon: "https://example.com/icons/java-icon.png",
  slug: "code-lofi-chill-nghe-nhac-cung-toi",
  chapterList: [
    {
      title: "Nhạc lofi chill không lời",
      description:
        "Đây là một danh sách nhạc lofi chill không lời do mình tự tổng hợp.",
      videos: [
        {
          urlVideo: "c7jZkwv-DX4",
          docMore: "https://example.com/docs/java-intro.pdf",
          preOrder: 1,
        },
        {
          urlVideo: "6me17gGZYRg",
          docMore: "https://example.com/docs/streams-lambdas.pdf",
        },
        {
          urlVideo: "aT7kJsYMhiA",
          docMore: "https://example.com/docs/streams-lambdas.pdf",
        },
        {
          urlVideo: "RN2uB2KhNKk",
          docMore: "https://example.com/docs/streams-lambdas.pdf",
        },
        {
          urlVideo: "H2VLlcrRkic",
          docMore: "https://example.com/docs/streams-lambdas.pdf",
        },
      ],
    },
    {
      title: "Một số video nhạc Việt Nam Hay",
      description: "Đây cũng là một series nhạc việt mình hay nghe.",
      videos: [
        {
          urlVideo: "Ea_PxI6Y1dg",
          docMore: "https://example.com/docs/java-intro.pdf",
        },
        {
          urlVideo: "Bunu0wj6c9c",
          docMore: "https://example.com/docs/streams-lambdas.pdf",
        },
        {
          urlVideo: "qFc5UIij9WM",
          docMore: "https://example.com/docs/streams-lambdas.pdf",
        },
        {
          urlVideo: "7G4iiOVGiQM",
          docMore: "https://example.com/docs/streams-lambdas.pdf",
        },
        {
          urlVideo: "t7tZFq29lis",
          docMore: "https://example.com/docs/streams-lambdas.pdf",
        },
      ],
    },
  ],
};
