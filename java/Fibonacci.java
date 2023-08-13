
class Fibonacci {

    public static int getFibonacci(int number) {

        if(number == 1 || number == 2) {
            return number-1;
        }
        return getFibonacci(number-1) + getFibonacci(number-2);
    }
    public static void main(String[] args) {
        int result = getFibonacci(Integer.parseInt(args[0]));
        System.out.println(result);
    }
}