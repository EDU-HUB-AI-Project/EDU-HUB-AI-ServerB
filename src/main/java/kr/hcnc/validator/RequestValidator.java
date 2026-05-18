package kr.hcnc.validator;

public class RequestValidator {
    // 생년월일 검증
    public static boolean isValidBirthDate(String birthDate) {
        if(birthDate == null || birthDate.isEmpty()) return false;
        if(!birthDate.matches("^[0-9]{6}$")) return false;

        int month = Integer.parseInt(birthDate.substring(2, 4));
        int day = Integer.parseInt(birthDate.substring(4, 6));

        if(month < 1 || month > 12) return false;
        if(day < 1 || day > 31) return false;

        return true;
    }

    // 학생ID 검증
    public static boolean isValidStudentId(String studentId) {
        if(studentId == null || studentId.isEmpty()) return false;
        return studentId.matches("^STU_[0-9A-Za-z]+$");
    }
}
