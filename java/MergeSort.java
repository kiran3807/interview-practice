

public class MergeSort {
    
    private static void _mergeSort(int[] arr, int start, int end) {

        if(start == end) {
            return;
        }
        int mid = (start + end)/2;
        _mergeSort(arr, start, mid);
        _mergeSort(arr, mid+1, end);

        int[] temp = new int[(end-start)+1];

        {
            int i=start, j=mid+1, k=0;
            for(; i<=mid && j<=end;) {

                if(arr[i] < arr[j]) {
                    temp[k] = arr[i];
                    i++;
                    k++;
                } else {
                    temp[k] = arr[j];
                    j++;
                    k++;
                }
            }
            if(i<=mid && k<=end-start) {
                for(;i<=mid;i++,k++) {
                    temp[k] = arr[i];
                }
            } else if(j<=end && k<=end-start) {
                for(;j<=end;j++,k++) {
                    temp[k] = arr[j];
                }
            }

        }

        for(int i=start, j=0; i<=end; i++,j++) {
            arr[i] = temp[j];
        }
    }
    public static void main(String[] args) {

        if(args.length != 1) {
            throw new RuntimeException("input error");
        }

        String[] charArray = args[0].split(" ");
        int [] intArray = new int[charArray.length];

        for(int i = 0; i< charArray.length; i++) {
            intArray[i] = Integer.parseInt(charArray[i]);
        };

        _mergeSort(intArray, 0, intArray.length-1);

        for(int i : intArray) {
            System.out.print(i);
            System.out.print(" ");
        }
    }
}
