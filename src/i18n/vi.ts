// SPDX-FileCopyrightText: 2020 Michael Albert
// SPDX-FileCopyrightText: 2020 - 2024 Manuel Stahl
// SPDX-FileCopyrightText: 2021 Dirk Klimpel
// SPDX-FileCopyrightText: 2023 Przemysław Romanik
// SPDX-FileCopyrightText: 2024 Alexander Tumin
// SPDX-FileCopyrightText: 2024 - 2025 Borislav Pantaleev
// SPDX-FileCopyrightText: 2024 - 2025 Nikita Chernyi
//
// SPDX-License-Identifier: Apache-2.0

import vietnameseMessages from "ra-language-vietnamese";

import { SynapseTranslationMessages } from ".";

const vi: SynapseTranslationMessages = {
  ...vietnameseMessages,
  synapseadmin: {
    auth: {
      base_url: "URL Homeserver",
      welcome: "Chào mừng đến với SevenChat Admin",
      server_version: "Phiên bản Synapse",
      supports_specs: "hỗ trợ đặc tả Matrix",
      username_error: "Vui lòng nhập ID người dùng đầy đủ: '@user:domain'",
      protocol_error: "URL phải bắt đầu bằng 'http://' hoặc 'https://'",
      url_error: "Không phải URL máy chủ Matrix hợp lệ",
      sso_sign_in: "Đăng nhập bằng SSO",
      credentials: "Thông tin đăng nhập",
      access_token: "Token truy cập",
      logout_acces_token_dialog: {
        title: "Bạn đang sử dụng token truy cập Matrix hiện có.",
        content:
          "Bạn có muốn hủy phiên này (có thể được sử dụng ở nơi khác, ví dụ: trong ứng dụng Matrix) hay chỉ đăng xuất khỏi bảng quản trị?",
        confirm: "Hủy phiên",
        cancel: "Chỉ đăng xuất khỏi bảng quản trị",
      },
    },
    users: {
      invalid_user_id: "Phần cục bộ của ID người dùng Matrix không có homeserver.",
      tabs: {
        sso: "SSO",
        experimental: "Thử nghiệm",
        limits: "Giới hạn tốc độ",
        account_data: "Dữ liệu tài khoản",
      },
    },
    rooms: {
      details: "Chi tiết phòng",
      tabs: {
        basic: "Cơ bản",
        members: "Thành viên",
        detail: "Chi tiết",
        permission: "Quyền hạn",
        media: "Phương tiện",
      },
    },
    reports: { tabs: { basic: "Cơ bản", detail: "Chi tiết" } },
  },
  import_users: {
    error: {
      at_entry: "Tại mục %{entry}: %{message}",
      error: "Lỗi",
      required_field: "Trường bắt buộc '%{field}' không có mặt",
      invalid_value: "Giá trị không hợp lệ ở dòng %{row}. Trường '%{field}' chỉ có thể là 'true' hoặc 'false'",
      unreasonably_big: "Từ chối tải file quá lớn %{size} megabyte",
      already_in_progress: "Một lần import đang chạy",
      id_exits: "ID %{id} đã tồn tại",
    },
    title: "Import người dùng qua CSV",
    goToPdf: "Đi đến PDF",
    cards: {
      importstats: {
        header: "Người dùng đã phân tích để import",
        users_total: "%{smart_count} người dùng trong file CSV |||| %{smart_count} người dùng trong file CSV",
        guest_count: "%{smart_count} khách |||| %{smart_count} khách",
        admin_count: "%{smart_count} quản trị viên |||| %{smart_count} quản trị viên",
      },
      conflicts: {
        header: "Chiến lược xung đột",
        mode: {
          stop: "Dừng khi xung đột",
          skip: "Hiển thị lỗi và bỏ qua khi xung đột",
        },
      },
      ids: {
        header: "ID",
        all_ids_present: "ID có mặt ở mọi mục",
        count_ids_present: "%{smart_count} mục có ID |||| %{smart_count} mục có ID",
        mode: {
          ignore: "Bỏ qua ID trong CSV và tạo mới",
          update: "Cập nhật bản ghi hiện có",
        },
      },
      passwords: {
        header: "Mật khẩu",
        all_passwords_present: "Mật khẩu có mặt ở mọi mục",
        count_passwords_present: "%{smart_count} mục có mật khẩu |||| %{smart_count} mục có mật khẩu",
        use_passwords: "Sử dụng mật khẩu từ CSV",
      },
      upload: {
        header: "Tải file CSV",
        explanation:
          "Tại đây bạn có thể tải lên file với các giá trị được phân tách bằng dấu phẩy để tạo hoặc cập nhật người dùng. File phải bao gồm các trường 'id' và 'displayname'. Bạn có thể tải xuống và điều chỉnh file mẫu tại đây: ",
      },
      startImport: {
        simulate_only: "Chỉ mô phỏng",
        run_import: "Import",
      },
      results: {
        header: "Kết quả import",
        total: "%{smart_count} mục tổng cộng |||| %{smart_count} mục tổng cộng",
        successful: "%{smart_count} mục import thành công",
        skipped: "%{smart_count} mục bị bỏ qua",
        download_skipped: "Tải xuống bản ghi bị bỏ qua",
        with_error: "%{smart_count} mục có lỗi |||| %{smart_count} mục có lỗi",
        simulated_only: "Chỉ chạy mô phỏng",
      },
    },
  },
  delete_media: {
    name: "Phương tiện",
    fields: {
      before_ts: "truy cập cuối trước",
      size_gt: "Lớn hơn (tính bằng byte)",
      keep_profiles: "Giữ hình ảnh hồ sơ",
    },
    action: {
      send: "Xóa phương tiện",
      send_success: "Yêu cầu đã được gửi thành công.",
      send_failure: "Đã xảy ra lỗi.",
    },
    helper: {
      send: "API này xóa phương tiện cục bộ khỏi ổ đĩa của máy chủ của bạn. Điều này bao gồm bất kỳ hình thu nhỏ cục bộ và bản sao của phương tiện đã tải xuống. API này sẽ không ảnh hưởng đến phương tiện đã được tải lên các kho lưu trữ phương tiện bên ngoài.",
    },
  },
  purge_remote_media: {
    name: "Phương tiện từ xa",
    fields: {
      before_ts: "truy cập cuối trước",
    },
    action: {
      send: "Xóa phương tiện từ xa",
      send_success: "Yêu cầu xóa phương tiện từ xa đã được gửi.",
      send_failure: "Đã xảy ra lỗi với yêu cầu xóa phương tiện từ xa.",
    },
    helper: {
      send: "API này xóa bộ nhớ cache phương tiện từ xa khỏi ổ đĩa của máy chủ của bạn. Điều này bao gồm bất kỳ hình thu nhỏ cục bộ và bản sao của phương tiện đã tải xuống. API này sẽ không ảnh hưởng đến phương tiện đã được tải lên kho lưu trữ phương tiện của máy chủ.",
    },
  },
  resources: {
    users: {
      name: "Người dùng |||| Người dùng",
      email: "Email",
      msisdn: "Điện thoại",
      threepid: "Email / Điện thoại",
      fields: {
        avatar: "Ảnh đại diện",
        id: "ID người dùng",
        name: "Tên",
        is_guest: "Khách",
        admin: "Quản trị viên máy chủ",
        locked: "Đã khóa",
        suspended: "Đã tạm ngưng",
        deactivated: "Đã vô hiệu hóa",
        erased: "Đã xóa",
        guests: "Hiển thị khách",
        show_deactivated: "Hiển thị người dùng đã vô hiệu hóa",
        show_locked: "Hiển thị người dùng đã khóa",
        show_suspended: "Hiển thị người dùng đã tạm ngưng",
        user_id: "Tìm kiếm người dùng",
        displayname: "Tên hiển thị",
        password: "Mật khẩu",
        avatar_url: "URL ảnh đại diện",
        avatar_src: "Ảnh đại diện",
        medium: "Phương tiện",
        threepids: "3PIDs",
        address: "Địa chỉ",
        creation_ts_ms: "Thời gian tạo",
        consent_version: "Phiên bản đồng ý",
        auth_provider: "Nhà cung cấp",
        user_type: "Loại người dùng",
      },
      helper: {
        password: "Thay đổi mật khẩu sẽ đăng xuất người dùng khỏi tất cả phiên.",
        password_required_for_reactivation: "Bạn phải cung cấp mật khẩu để kích hoạt lại tài khoản.",
        create_password: "Tạo mật khẩu mạnh và an toàn bằng nút bên dưới.",
        lock: "Ngăn người dùng sử dụng tài khoản một cách hữu ích. Đây là hành động không phá hủy có thể đảo ngược.",
        deactivate: "Bạn phải cung cấp mật khẩu để kích hoạt lại tài khoản.",
        suspend: "Tạm ngưng người dùng có nghĩa là họ được đặt vào chế độ chỉ đọc.",
        erase: "Ngoài việc vô hiệu hóa người dùng, đánh dấu người dùng là đã xóa theo GDPR.",
        admin: "Quản trị viên máy chủ có toàn quyền kiểm soát máy chủ và người dùng của nó.",
        erase_text:
          "Điều này có nghĩa là tin nhắn được gửi bởi người dùng sẽ vẫn hiển thị cho bất kỳ ai đã ở trong phòng khi những tin nhắn này được gửi, nhưng ẩn khỏi người dùng tham gia phòng sau đó.",
        erase_admin_error: "Không được phép xóa người dùng của chính mình.",
        lock_self_error: "Không thể tự khóa tài khoản của bạn.",
        modify_managed_user_error: "Không được phép sửa đổi người dùng được quản lý bởi hệ thống.",
        username_available: "Tên người dùng có sẵn",
      },
      action: {
        erase: "Xóa dữ liệu người dùng",
        erase_avatar: "Xóa ảnh đại diện",
        delete_media: "Xóa tất cả phương tiện được tải lên bởi người dùng",
        redact_events: "Xóa tất cả sự kiện được gửi bởi người dùng",
        generate_password: "Tạo mật khẩu",
        overwrite_title: "Cảnh báo!",
        overwrite_content: "Tên người dùng này đã được sử dụng. Bạn có chắc chắn muốn ghi đè người dùng hiện có?",
        overwrite_cancel: "Hủy",
        overwrite_confirm: "Ghi đè",
        lock_selected: "Khóa người dùng đã chọn",
        lock_selected_title: "Khóa tài khoản đã chọn? |||| Khóa %{smart_count} tài khoản đã chọn?",
        lock_selected_content:
          "Bạn có chắc chắn muốn khóa tài khoản này và đăng xuất khỏi tất cả thiết bị? |||| Bạn có chắc chắn muốn khóa %{smart_count} tài khoản đã chọn và đăng xuất khỏi tất cả thiết bị?",
        lock_selected_success: "Đã khóa %{smart_count} tài khoản. |||| Đã khóa %{smart_count} tài khoản.",
        lock_selected_failure: "Không thể khóa các tài khoản đã chọn: %{ids}.",
        lock_selected_partial_failure: "Một số tài khoản không khóa được (%{smart_count}): %{ids}.",
        unlock_selected: "Mở khóa người dùng đã chọn",
        unlock_selected_title: "Mở khóa tài khoản đã chọn? |||| Mở khóa %{smart_count} tài khoản đã chọn?",
        unlock_selected_content: "Bạn có chắc chắn muốn mở khóa tài khoản này? |||| Bạn có chắc chắn muốn mở khóa %{smart_count} tài khoản đã chọn?",
        unlock_selected_success: "Đã mở khóa %{smart_count} tài khoản. |||| Đã mở khóa %{smart_count} tài khoản.",
        unlock_selected_failure: "Không thể mở khóa các tài khoản đã chọn: %{ids}.",
        unlock_selected_partial_failure: "Một số tài khoản không mở khóa được (%{smart_count}): %{ids}.",
      },
      badge: {
        you: "Bạn",
        bot: "Bot",
        admin: "Quản trị viên",
        support: "Hỗ trợ",
        regular: "Người dùng thường",
        system_managed: "Được quản lý bởi hệ thống",
      },
      limits: {
        messages_per_second: "Tin nhắn mỗi giây",
        messages_per_second_text: "Số lượng hành động có thể thực hiện trong một giây.",
        burst_count: "Số lượng burst",
        burst_count_text: "Có bao nhiêu hành động có thể thực hiện trước khi bị giới hạn.",
      },
      account_data: {
        title: "Dữ liệu tài khoản",
        global: "Toàn cục",
        rooms: "Phòng",
      },
    },
    rooms: {
      name: "Phòng |||| Phòng",
      fields: {
        room_id: "ID phòng",
        name: "Tên",
        canonical_alias: "Bí danh",
        joined_members: "Thành viên",
        joined_local_members: "Thành viên cục bộ",
        joined_local_devices: "Thiết bị cục bộ",
        state_events: "Sự kiện trạng thái / Độ phức tạp",
        version: "Phiên bản",
        is_encrypted: "Đã mã hóa",
        encryption: "Mã hóa",
        federatable: "Có thể liên kết",
        public: "Hiển thị trong thư mục phòng",
        creator: "Người tạo",
        join_rules: "Quy tắc tham gia",
        guest_access: "Truy cập khách",
        history_visibility: "Hiển thị lịch sử",
        topic: "Chủ đề",
        avatar: "Ảnh đại diện",
        actions: "Hành động",
      },
      helper: {
        forward_extremities:
          "Forward extremities là các sự kiện lá ở cuối đồ thị có hướng không chu trình (DAG) trong một phòng, hay còn gọi là các sự kiện không có con. Càng nhiều sự kiện này tồn tại trong một phòng, Synapse càng cần thực hiện nhiều phân giải trạng thái (gợi ý: đây là một thao tác tốn kém). Mặc dù Synapse có mã để ngăn quá nhiều sự kiện này tồn tại cùng lúc trong một phòng, lỗi đôi khi có thể làm chúng xuất hiện lại. Nếu một phòng có >10 forward extremities, đáng để kiểm tra phòng nào là thủ phạm và có thể xóa chúng bằng các truy vấn SQL được đề cập trong #1760.",
      },
      enums: {
        join_rules: {
          public: "Công khai",
          knock: "Gõ cửa",
          invite: "Mời",
          private: "Riêng tư",
        },
        guest_access: {
          can_join: "Khách có thể tham gia",
          forbidden: "Khách không thể tham gia",
        },
        history_visibility: {
          invited: "Từ khi được mời",
          joined: "Từ khi tham gia",
          shared: "Từ khi chia sẻ",
          world_readable: "Bất kỳ ai",
        },
        unencrypted: "Không mã hóa",
      },
      action: {
        erase: {
          title: "Xóa phòng",
          content:
            "Bạn có chắc chắn muốn xóa phòng? Điều này không thể hoàn tác. Tất cả tin nhắn và phương tiện được chia sẻ trong phòng sẽ bị xóa khỏi máy chủ!",
          fields: {
            block: "Chặn và ngăn người dùng tham gia phòng",
          },
          success: "Phòng đã được xóa thành công.",
          failure: "Không thể xóa phòng.",
        },
        make_admin: {
          assign_admin: "Gán quản trị viên",
          title: "Gán quản trị viên phòng cho %{roomName}",
          confirm: "Làm quản trị viên",
          content:
            "Đặt MXID đầy đủ của người dùng sẽ được đặt làm quản trị viên.\nCảnh báo: để điều này hoạt động, phòng cần có ít nhất một thành viên cục bộ làm quản trị viên.",
          success: "Người dùng đã được đặt làm quản trị viên phòng.",
          failure: "Không thể đặt người dùng làm quản trị viên phòng. %{errMsg}",
        },
      },
    },
    reports: {
      name: "Sự kiện được báo cáo |||| Sự kiện được báo cáo",
      fields: {
        id: "ID",
        received_ts: "thời gian báo cáo",
        user_id: "người báo cáo",
        name: "tên phòng",
        score: "điểm",
        reason: "lý do",
        event_id: "ID sự kiện",
        event_json: {
          origin: "máy chủ gốc",
          origin_server_ts: "thời gian gửi",
          type: "loại sự kiện",
          content: {
            msgtype: "loại nội dung",
            body: "nội dung",
            format: "định dạng",
            formatted_body: "nội dung có định dạng",
            algorithm: "thuật toán",
            url: "URL",
            info: {
              mimetype: "Loại",
            },
          },
        },
      },
      action: {
        erase: {
          title: "Xóa sự kiện được báo cáo",
          content: "Bạn có chắc chắn muốn xóa sự kiện được báo cáo? Điều này không thể hoàn tác.",
        },
      },
    },
    connections: {
      name: "Kết nối",
      fields: {
        last_seen: "Ngày",
        ip: "Địa chỉ IP",
        user_agent: "User agent",
      },
    },
    devices: {
      name: "Thiết bị |||| Thiết bị",
      fields: {
        device_id: "ID thiết bị",
        display_name: "Tên thiết bị",
        last_seen_ts: "Thời gian",
        last_seen_ip: "Địa chỉ IP",
      },
      action: {
        erase: {
          title: "Xóa %{id}",
          content: 'Bạn có chắc chắn muốn xóa thiết bị "%{name}"?',
          success: "Thiết bị đã được xóa thành công.",
          failure: "Đã xảy ra lỗi.",
        },
      },
    },
    users_media: {
      name: "Phương tiện",
      fields: {
        media_id: "ID phương tiện",
        media_length: "Kích thước file (tính bằng byte)",
        media_type: "Loại",
        upload_name: "Tên file",
        quarantined_by: "Bị cách ly bởi",
        safe_from_quarantine: "An toàn khỏi cách ly",
        created_ts: "Đã tạo",
        last_access_ts: "Truy cập cuối",
      },
      action: {
        open: "Mở file phương tiện trong cửa sổ mới",
      },
    },
    protect_media: {
      action: {
        create: "Không được bảo vệ, tạo bảo vệ",
        delete: "Được bảo vệ, xóa bảo vệ",
        none: "Trong cách ly",
        send_success: "Đã thay đổi trạng thái bảo vệ thành công.",
        send_failure: "Đã xảy ra lỗi.",
      },
    },
    quarantine_media: {
      action: {
        name: "Cách ly",
        create: "Thêm vào cách ly",
        delete: "Trong cách ly, bỏ cách ly",
        none: "Được bảo vệ khỏi cách ly",
        send_success: "Đã thay đổi trạng thái cách ly thành công.",
        send_failure: "Đã xảy ra lỗi.",
      },
    },
    pushers: {
      name: "Pusher |||| Pushers",
      fields: {
        app: "Ứng dụng",
        app_display_name: "Tên hiển thị ứng dụng",
        app_id: "ID ứng dụng",
        device_display_name: "Tên hiển thị thiết bị",
        kind: "Loại",
        lang: "Ngôn ngữ",
        profile_tag: "Thẻ hồ sơ",
        pushkey: "Pushkey",
        data: { url: "URL" },
      },
    },
    servernotices: {
      name: "Thông báo máy chủ",
      send: "Gửi thông báo máy chủ",
      fields: {
        body: "Tin nhắn",
      },
      action: {
        send: "Gửi thông báo",
        send_success: "Thông báo máy chủ đã được gửi thành công.",
        send_failure: "Đã xảy ra lỗi.",
      },
      helper: {
        send: 'Gửi thông báo máy chủ đến người dùng đã chọn. Tính năng "Thông báo máy chủ" phải được kích hoạt tại máy chủ.',
      },
    },
    user_media_statistics: {
      name: "Phương tiện người dùng",
      fields: {
        media_count: "Số lượng phương tiện",
        media_length: "Độ dài phương tiện",
      },
    },
    forward_extremities: {
      name: "Forward Extremities",
      fields: {
        id: "ID sự kiện",
        received_ts: "Thời gian",
        depth: "Độ sâu",
        state_group: "Nhóm trạng thái",
      },
    },
    room_state: {
      name: "Sự kiện trạng thái",
      fields: {
        type: "Loại",
        content: "Nội dung",
        origin_server_ts: "thời gian gửi",
        sender: "Người gửi",
      },
    },
    room_media: {
      name: "Phương tiện",
      fields: {
        media_id: "ID phương tiện",
      },
      helper: {
        info: "Đây là danh sách phương tiện đã được tải lên phòng. Không thể xóa phương tiện đã được tải lên các kho lưu trữ phương tiện bên ngoài.",
      },
      action: {
        error: "%{errcode} (%{errstatus}) %{error}",
      },
    },
    room_directory: {
      name: "Thư mục phòng",
      fields: {
        world_readable: "người dùng khách có thể xem mà không cần tham gia",
        guest_can_join: "người dùng khách có thể tham gia",
      },
      action: {
        title: "Xóa phòng khỏi thư mục |||| Xóa %{smart_count} phòng khỏi thư mục",
        content:
          "Bạn có chắc chắn muốn xóa phòng này khỏi thư mục? |||| Bạn có chắc chắn muốn xóa %{smart_count} phòng này khỏi thư mục?",
        erase: "Xóa khỏi thư mục phòng",
        create: "Công bố trong thư mục phòng",
        send_success: "Phòng đã được công bố thành công.",
        send_failure: "Đã xảy ra lỗi.",
      },
    },
    destinations: {
      name: "Liên kết",
      fields: {
        destination: "Đích đến",
        failure_ts: "Thời gian thất bại",
        retry_last_ts: "Thời gian thử lại cuối",
        retry_interval: "Khoảng thời gian thử lại",
        last_successful_stream_ordering: "Luồng thành công cuối",
        stream_ordering: "Luồng",
      },
      action: { reconnect: "Kết nối lại" },
    },
    registration_tokens: {
      name: "Token đăng ký",
      fields: {
        token: "Token",
        valid: "Token hợp lệ",
        uses_allowed: "Số lần sử dụng được phép",
        pending: "Đang chờ",
        completed: "Đã hoàn thành",
        expiry_time: "Thời gian hết hạn",
        length: "Độ dài",
      },
      helper: { length: "Độ dài của token nếu không có token được cung cấp." },
    },
  },
  scheduled_commands: {
    action: {
      create_success: "Lệnh đã lên lịch được tạo thành công",
      update_success: "Lệnh đã lên lịch được cập nhật thành công",
      update_failure: "Đã xảy ra lỗi",
      delete_success: "Lệnh đã lên lịch được xóa thành công",
      delete_failure: "Đã xảy ra lỗi",
    },
  },
  recurring_commands: {
    action: {
      create_success: "Lệnh lặp lại được tạo thành công",
      update_success: "Lệnh lặp lại được cập nhật thành công",
      update_failure: "Đã xảy ra lỗi",
      delete_success: "Lệnh lặp lại được xóa thành công",
      delete_failure: "Đã xảy ra lỗi",
    },
  },
};
export default vi; 
