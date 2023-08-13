import java.util.*;

public class MatriceOperations {
    
    private static int getRandomNumber() {
        return (int) (Math.random() * (10));
    }
    public static void main(String args[]) {

        int rows = 2; int cols = 2;
        Matrice matriceOne = new Matrice(rows, cols);
        Matrice matriceTwo = new Matrice(rows, cols);

        for(int i=0; i<rows; i++) {
            for(int j=0; j<cols; j++) {
                matriceOne.setElement(i, j, getRandomNumber());
                matriceTwo.setElement(i, j, getRandomNumber());
            }
        }

        matriceOne.printMatrice();
        System.out.println("---------------");

        matriceTwo.printMatrice();
        System.out.println("---------------");

        Matrice matriceProduct = matriceOne.multiply(matriceTwo);
        matriceProduct.printMatrice();
    }
}

class CannotMultiplyMatrixesException extends RuntimeException {
    CannotMultiplyMatrixesException() {
        super("cannot multiply matrixes with mismatched coloumns and rows");
    }
}

class Matrice {

    private int[][] matrice;
    private int rows;
    private int coloumns;

    Matrice(int rows, int col) {
        this.matrice = new int[rows][col];
        this.rows = rows;
        this.coloumns = col;
    }

    public void setElement(int row, int col, int element) {
        this.matrice[row][col] = element;
    }

    public int getElement(int row, int col) {
        return this.matrice[row][col];
    }

    public Matrice multiply(Matrice otherMatrice) {

        if(this.coloumns != otherMatrice.rows) {
            throw new CannotMultiplyMatrixesException();
        }
        
        Matrice product = new Matrice(this.rows, otherMatrice.coloumns);
        int limit = this.coloumns;

        /*
        int firstMatriceRow = 0;
        int secondMatriceCol = 0;
        
        while(secondMatriceCol < otherMatrice.coloumns) {

            int sum = 0;
            for(int i=0; i<limit; i++) {
                sum = (this.matrice[firstMatriceRow][i] * otherMatrice.getElement(i, secondMatriceCol)) +  sum;
            }
            product.setElement(firstMatriceRow, secondMatriceCol, sum);

            firstMatriceRow++;
            firstMatriceRow = firstMatriceRow % this.rows;
            if( firstMatriceRow == 0 ) {
                secondMatriceCol++;
            }
        }*/

        for(int i = 0; i<this.rows; i++) {
            for(int j = 0; j<otherMatrice.coloumns; j++) {
                
                int sum = 0;
                for(int k = 0; k<limit; k++) {
                    sum += this.matrice[i][k] * otherMatrice.getElement(k, j);
                }
                product.setElement(i, j, sum);
            }
        }

        return product;

    }

    public void printMatrice() {

        for(int[] r : this.matrice) {
            for(int c : r) {
                System.out.print(c + " ");
            }
            System.out.println("");
        }
    }
}